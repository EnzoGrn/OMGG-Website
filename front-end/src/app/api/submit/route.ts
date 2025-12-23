import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/api/NewsLetter';
import slugify from 'slugify';
import { sendGameSubmissionEmbed } from '@/lib/discord/sendGameSubmissionEmbed';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const headers: Record<string, string> = {
    "Content-Type": "application/json",
};

if (NEXT_PUBLIC_STRAPI_API_TOKEN)
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;

// Helper function to check if a company exists by name
async function findCompanyBySlug(slug: string): Promise<{ existingCompanyId: string | null; attestants: string[] }> {
    const url = new URL(`${STRAPI_URL}/api/companies?populate=attestants`);
    url.searchParams.set("filters[slug][$eq]", slug);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
    });

    const data = await response.json();

    // Extract documentIds from attestants array
    const attestantIds = data.data.length > 0 && data.data[0].attestants
        ? data.data[0].attestants.map((attestant: any) => attestant.documentId)
        : [];

    return {
        attestants: attestantIds,
        existingCompanyId: data.data.length > 0 ? data.data[0].documentId : null,
    };
}

// Helper function to check if an attestant exists by email
async function findAttestantByEmail(email: string): Promise<string | null> {
    const url = new URL(`${STRAPI_URL}/api/attestants`);

    url.searchParams.set("filters[email][$eq]", email);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
    });

    const data = await response.json();

    return data.data.length > 0 ? data.data[0].documentId : null;
}

// Create or update attestant
async function createOrUpdateAttestant(attestantData: any): Promise<string> {
    const existingAttestantId = await findAttestantByEmail(attestantData.email);

    if (existingAttestantId) { // Update existing attestant
        const url = new URL(`${STRAPI_URL}/api/attestants/${existingAttestantId}`);
        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                data: {
                    firstName: attestantData.firstname,
                    lastName: attestantData.lastname,
                    email: attestantData.email,
                    phone: attestantData.phone,
                }
            }),
        });

        if (!response.ok)
            throw new Error(`Failed to update attestant: ${await response.text()}`);
        return existingAttestantId;
    } else { // Create new attestant
        const url = new URL(`${STRAPI_URL}/api/attestants`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: {
                    firstName: attestantData.firstname,
                    lastName: attestantData.lastname,
                    email: attestantData.email,
                    phone: attestantData.phone,
                }
            }),
        });

        if (!response.ok)
            throw new Error(`Failed to create attestant: ${await response.text()}`);
        const data = await response.json();

        return data.data.documentId;
    }
}

// Create or update company
async function createOrUpdateCompany(companyName: string, website: string, attestantId: string): Promise<string> {
    const slug = slugify(companyName.toLowerCase());

    const { attestants, existingCompanyId } = await findCompanyBySlug(slug);

    if (existingCompanyId) { // Update existing company
        const url = new URL(`${STRAPI_URL}/api/companies/${existingCompanyId}`);
        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                data: {
                    slug: slug,
                    name: companyName,
                    website: website,
                    attestants: [...attestants, attestantId]
                }
            }),
        });

        if (!response.ok)
            throw new Error(`Failed to update company: ${await response.text()}`);
        return existingCompanyId;
    } else { // Create new company
        const url = new URL(`${STRAPI_URL}/api/companies`);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: {
                    slug: slug,
                    name: companyName,
                    website: website,
                    attestants: [attestantId],
                }
            }),
        });

        if (!response.ok)
            throw new Error(`Failed to create company: ${await response.text()}`);
        const data = await response.json();

        return data.data.documentId;
    }
}

// Upload a single file to Strapi
async function uploadFile(file: File) {
    const formData = new FormData();

    formData.append('files', file);

    const uploadHeaders: Record<string, string> = {};

    if (NEXT_PUBLIC_STRAPI_API_TOKEN)
        uploadHeaders["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        headers: uploadHeaders,
        body: formData,
    });

    if (!response.ok) {
        console.error(`Failed to upload file ${file.name}:`, await response.text());
        return null;
    }

    const data = await response.json();

    return data && data[0] ? data[0] : null;
}

// Upload multiple files
async function uploadFiles(files: File[]) {
    if (!files || files.length === 0)
        return [];
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);

    return results.filter((data) => data !== null);
}

// Create game
async function createGame(gameData: any, photoIds: number[], rulesDocumentId: number | null): Promise<string> {
    const url = new URL(`${STRAPI_URL}/api/quotation-games`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers,
        body: JSON.stringify({
            data: {
                name: gameData.name,
                type: gameData.type,
                devStage: gameData.devStage,
                playersCount: gameData.playerCount,
                gameDuration: gameData.gameDuration,
                recommendedAge: gameData.recommendedAge,
                complexity: gameData.complexity,
                detailedDescription: gameData.detailedDescription,
                shortDescription: gameData.shortDescription,
                theme: gameData.theme || null,
                uniqueFeatures: gameData.uniqueFeature || null,
                mainMechanic: gameData.mainMechanic,
                demoVideo: gameData.demoVideo || null,
                photos: photoIds,
                rulesDocument: rulesDocumentId,
            }
        }),
    });

    if (!response.ok)
        throw new Error(`Failed to create game: ${await response.text()}`);
    const data = await response.json();
    return data.data.documentId;
}

// Create devis (quote)
async function createDevis(devisData: any, companyId: string, gameId: string): Promise<string> {
    const url = new URL(`${STRAPI_URL}/api/quotations`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers,
        body: JSON.stringify({
            data: {
                company: companyId,
                quotationGame: gameId,
                additionalInfo: devisData.additionalInfo || null,
                budget: devisData.budget,
                deadline: devisData.deadline,
                services: devisData.services,
            }
        }),
    });

    if (!response.ok)
        throw new Error(`Failed to create devis: ${await response.text()}`);
    const data = await response.json();

    return data.data.documentId;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const dataString = formData.get('data') as string;

        if (!dataString) {
            return NextResponse.json({
                success: false,
                message: 'No data provided',
            }, { status: 400 });
        }

        const body = JSON.parse(dataString);

        // Get files
        const photos = formData.getAll('photos') as File[];
        const rulesDocument = formData.get('rulesDocument') as File | null;

        // Step 1: Create or update attestant
        const attestantId = await createOrUpdateAttestant(body.attestant);

        // Step 2: Create or update company (if company name is provided)
        let companyId: string;

        if (body.attestant.company) {
            companyId = await createOrUpdateCompany(body.attestant.company, body.attestant.website, attestantId);
        } else { // If no company, create a default one with attestant name
            const defaultCompanyName = `${body.attestant.firstname} ${body.attestant.lastname}`;

            companyId = await createOrUpdateCompany(defaultCompanyName, body.attestant.website, attestantId);
        }

        // Step 3: Upload photos and rules document
        let photosData: any[] = [];
        let rules = null;

        if (photos && photos.length > 0)
            photosData = await uploadFiles(photos);
        if (rulesDocument)
            rules = await uploadFile(rulesDocument);

        // Step 4: Create game
        const gameData = {
            ...body.gameInformation,
            ...body.gameDescription,
            demoVideo: body.gameMedia.demoVideo,
        };

        console.log(photosData);
        console.log(rules);

        const gameId = await createGame(gameData, photosData.map((photo) => Number(photo.id)), rules?.id ? Number(rules.id) : null);

        // Step 5: Create devis
        const devisId = await createDevis(body.devis, companyId, gameId);

        // Step 6: Handle newsletter subscription if accepted
        if (body.acceptCommunications) {
            try {
                await register(body.attestant.email, true, true);
            } catch (error) {
                console.error('Newsletter subscription failed:', error);
            }
        }

        await sendGameSubmissionEmbed({
            ...body,
            media: {
                photosUrls: photosData.map(photo => `${STRAPI_URL}${photo.url}`),
                rulesUrl: rules?.url ? `${STRAPI_URL}${rules.url}` : undefined,
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Form submitted successfully',
            data: {
                attestantId,
                companyId,
                gameId,
                devisId,
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Error processing form submission:', error);

        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'An error occurred while processing your submission',
        }, { status: 500 });
    }
}
