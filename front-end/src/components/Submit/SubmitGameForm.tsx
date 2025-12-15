"use client";

import { useState } from "react";
import { StepTimeline, TimelineStep } from "./StepTimeline";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUser, FaGamepad, FaImages, FaExclamationCircle } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";
import { RiSettings5Fill } from "react-icons/ri";
import { Container } from "../Section/Container";
import { FaAngleLeft, FaAngleRight, FaDownload, FaTrash } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useLocale, useTranslations } from "next-intl";
import { FileInputField, InputField, SelectField, TextAreaField } from "./Fields/Input";
import { toast } from "sonner";

interface AttestantInformation {
  firstname: string;
  lastname: string;

  company?: string;

  email: string;
  phone: string;
  website: string;
}

interface GameInformation {
  name: string;

  type: string;
  typeOther: string;

  devStage: string;
  devStageOther: string;

  playerCount: string;

  gameDuration: string;

  recommendedAge: string;

  complexity: string;
}

interface GameDescription {
  shortDescription: string;
  detailedDescription: string;

  mainMechanic: string;

  theme?: string;

  uniqueFeature?: string;
}

interface GameMedia {
  photos: File[];

  rulesDocument: File | null;

  demoVideo?: string;
}

interface Services {
  fullAdaptation: boolean;
  mobileApp: boolean;
  interactivePrototype: boolean;
}

interface Devis {
  services: Services;
  budget: string;
  deadline: string;
  additionalInfo: string;
}

interface FormData {

  // Step 1
  attestant: AttestantInformation;

  // Step 2
  gameInformation: GameInformation;

  // Step 3
  gameDescription: GameDescription;

  // Step 4
  gameMedia: GameMedia;

  // Step 5
  devis: Devis;

  confirmAge: boolean;
  acceptCommunications: boolean;
  acceptDataProcessing: boolean;
};

const initialFormData: FormData = {
  attestant: {
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    website: ""
  },
  gameInformation: {
    name: "",
    type: "",
    typeOther: "",
    devStage: "",
    devStageOther: "",
    playerCount: "",
    gameDuration: "",
    recommendedAge: "",
    complexity: ""
  },
  gameDescription: {
    shortDescription: "",
    detailedDescription: "",
    mainMechanic: "",
    theme: "",
    uniqueFeature: ""
  },
  gameMedia: {
    photos: [],
    rulesDocument: null,
    demoVideo: ""
  },
  devis: {
    services: {
      fullAdaptation: false,
      mobileApp: false,
      interactivePrototype: false,
    },
    budget: "",
    deadline: "",
    additionalInfo: "",
  },
  confirmAge: false,
  acceptCommunications: false,
  acceptDataProcessing: false,
};

export function SubmitGameForm() {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const t = useTranslations('SubmitGames.form');

  // Initialize steps with translations
  const steps: TimelineStep[] = [
    { id: 1, title: t('steps.personal.title'), subTitle: t('steps.personal.subTitle'), description: t('steps.personal.description'), icon: FaUser },
    { id: 2, title: t('steps.game.title'), subTitle: t('steps.game.subTitle'), description: t('steps.game.description'), icon: FaGamepad },
    { id: 3, title: t('steps.description.title'), subTitle: t('steps.description.subTitle'), description: t('steps.description.description'), icon: LuFileText },
    { id: 4, title: t('steps.media.title'), subTitle: t('steps.media.subTitle'), description: t('steps.media.description'), icon: FaImages },
    { id: 5, title: t('steps.services.title'), subTitle: t('steps.services.subTitle'), description: t('steps.services.description'), icon: RiSettings5Fill },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormDataStruct = (struct: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [struct]: {
        ...(prev[struct as keyof FormData] as any),
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors[field];

        return newErrors;
      });
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.attestant.firstname.trim()) newErrors.firstname = t('errors.firstnameRequired');
        if (!formData.attestant.lastname.trim()) newErrors.lastname = t('errors.lastnameRequired');
        if (!formData.attestant.email.trim()) {
          newErrors.email = t('errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.attestant.email)) {
          newErrors.email = t('errors.emailInvalid');
        }
        if (!formData.attestant.phone.trim()) {
          newErrors.phone = t('errors.phoneRequired');
        } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.attestant.phone)) {
          newErrors.phone = t('errors.phoneInvalid');
        }
        if (!formData.attestant.website.trim()) {
          newErrors.website = t('errors.websiteRequired');
        } else if (!/^https?:\/\/.+\..+/.test(formData.attestant.website)) {
          newErrors.website = t('errors.websiteInvalid');
        }
        break;
      case 2:
        if (!formData.gameInformation.name.trim()) newErrors.gameName = t('errors.gameNameRequired');
        if (!formData.gameInformation.type) newErrors.gameType = t('errors.gameTypeRequired');
        if (formData.gameInformation.type === "other" && !formData.gameInformation.typeOther.trim()) {
          newErrors.gameTypeOther = t('errors.gameTypeOtherRequired');
        }
        if (!formData.gameInformation.devStage) newErrors.devStage = t('errors.devStageRequired');
        if (formData.gameInformation.devStage === "other" && !formData.gameInformation.devStageOther.trim()) {
          newErrors.devStageOther = t('errors.devStageOtherRequired');
        }
        if (!formData.gameInformation.playerCount.trim()) newErrors.playerCount = t('errors.playerCountRequired');
        if (!formData.gameInformation.gameDuration.trim()) newErrors.gameDuration = t('errors.gameDurationRequired');
        if (!formData.gameInformation.recommendedAge) newErrors.recommendedAge = t('errors.recommendedAgeRequired');
        if (!formData.gameInformation.complexity) newErrors.complexity = t('errors.complexityRequired');
        break;
      case 3:
        if (!formData.gameDescription.shortDescription.trim()) {
          newErrors.shortDescription = t('errors.shortDescriptionRequired');
        } else if (formData.gameDescription.shortDescription.length > 200) {
          newErrors.shortDescription = t('errors.shortDescriptionMax');
        }
        if (!formData.gameDescription.detailedDescription.trim()) {
          newErrors.detailedDescription = t('errors.detailedDescriptionRequired');
        }
        if (!formData.gameDescription.mainMechanic.trim()) {
          newErrors.mainMechanic = t('errors.mainMechanicRequired');
        }
        break;
      case 4:
        if (formData.gameMedia.photos.length === 0) {
          newErrors.prototypePhotos = t('errors.prototypePhotosRequired');
        }
        if (!formData.gameMedia.rulesDocument) {
          newErrors.rulesDocument = t('errors.rulesDocumentRequired');
        }
        if (formData.gameMedia.demoVideo && !/^https?:\/\/.+\..+/.test(formData.gameMedia.demoVideo)) {
          newErrors.demoVideo = t('errors.demoVideoInvalid');
        }
        break;
      case 5:
        if (!formData.devis.services.fullAdaptation && !formData.devis.services.mobileApp && !formData.devis.services.interactivePrototype) {
          newErrors.services = t('errors.servicesRequired');
        }
        if (!formData.devis.budget) newErrors.budget = t('errors.budgetRequired');
        if (!formData.devis.deadline) newErrors.deadline = t('errors.deadlineRequired');
        if (!formData.confirmAge) newErrors.confirmAge = t('errors.confirmAgeRequired');
        if (!formData.acceptDataProcessing) {
          newErrors.acceptDataProcessing = t('errors.acceptDataProcessingRequired');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep))
        setCompletedSteps((prev) => [...prev, currentStep]);
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        scrollToTop();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    scrollToTop();
  };

  const handleStepClick = (stepId: number) => {
    if (completedSteps.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
      scrollToTop();
    }
  };

  const handleSubmit = async () => {
    if (validateStep(5)) {
      setIsSubmitting(true);
      const loadingToast = toast.loading(t('toast.submitting'));

      try {
        // Prepare the data to send
        const submitData = new FormData();

        // Add all form data as JSON (except files)
        const jsonData = {
          attestant: formData.attestant,
          gameInformation: formData.gameInformation,
          gameDescription: formData.gameDescription,
          gameMedia: {
            demoVideo: formData.gameMedia.demoVideo,
          },
          devis: formData.devis,
          confirmAge: formData.confirmAge,
          acceptCommunications: formData.acceptCommunications,
          acceptDataProcessing: formData.acceptDataProcessing,
        };

        submitData.append('data', JSON.stringify(jsonData));

        // Add photos
        formData.gameMedia.photos.forEach((photo, index) => {
          submitData.append(`photos`, photo);
        });

        // Add rules document
        if (formData.gameMedia.rulesDocument) {
          submitData.append('rulesDocument', formData.gameMedia.rulesDocument);
        }

        // Send to API
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: submitData,
        });

        const result = await response.json();

        toast.dismiss(loadingToast);

        if (response.ok && result.success) {
          toast.success(t('toast.success.title'), {
            description: t('toast.success.description'),
            duration: 5000,
          });

          // Reset form after successful submission
          setFormData(initialFormData);
          setCurrentStep(1);
          setCompletedSteps([]);
          scrollToTop();
        } else {
          toast.error(t('toast.error.title'), {
            description: result.message || t('toast.error.description'),
            duration: 6000,
          });
        }
      } catch (error) {
        console.error('Submission error:', error);
        toast.dismiss(loadingToast);
        toast.error(t('toast.error.network.title'), {
          description: t('toast.error.network.description'),
          duration: 6000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container className="py-16 overflow-x-visible">
      <StepTimeline steps={steps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={handleStepClick} />

      <Card className="mt-8 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{steps[currentStep - 1].subTitle}</CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="firstname" label={t('fields.firstname')} required value={formData.attestant.firstname} onChange={(e) => updateFormDataStruct("attestant", "firstname", e.target.value)} errorsMessage={errors.firstname} />
                <InputField id="lastname" label={t('fields.lastname')} required value={formData.attestant.lastname} onChange={(e) => updateFormDataStruct("attestant", "lastname", e.target.value)} errorsMessage={errors.lastname} />
              </div>

              <InputField id="company" label={t('fields.company')} value={formData.attestant.company} onChange={(e) => updateFormDataStruct("attestant", "company", e.target.value)} errorsMessage={errors.company} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="email" label={t('fields.email')} required value={formData.attestant.email} onChange={(e) => updateFormDataStruct("attestant", "email", e.target.value)} errorsMessage={errors.email} placeholder={t('placeholders.email')} />
                <InputField id="phone" label={t('fields.phone')} required value={formData.attestant.phone} onChange={(e) => updateFormDataStruct("attestant", "phone", e.target.value)} errorsMessage={errors.phone} placeholder={t('placeholders.phone')} />
              </div>

              <InputField id="website" label={t('fields.website')} required value={formData.attestant.website} onChange={(e) => updateFormDataStruct("attestant", "website", e.target.value)} errorsMessage={errors.website} placeholder={t('placeholders.website')} />
            </div>
          )}

          {/* Step 2: Game Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <InputField id="gameName" label={t('fields.gameName')} required value={formData.gameInformation.name} onChange={(e) => updateFormDataStruct("gameInformation", "name", e.target.value)} errorsMessage={errors.gameName} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField id="gameType" label={t('fields.gameType')} required value={formData.gameInformation.type} onChange={(value) => updateFormDataStruct("gameInformation", "type", value)} placeholder={t('placeholders.select')}
                  errorMessage={errors.gameType} items={[
                    { value: "plateau", label: t('options.gameType.plateau') },
                    { value: "cartes", label: t('options.gameType.cartes') },
                    { value: "des", label: t('options.gameType.des') },
                    { value: "pions", label: t('options.gameType.pions') },
                    { value: "adresse", label: t('options.gameType.adresse') },
                    { value: "logique", label: t('options.gameType.logique') },
                    { value: "quiz", label: t('options.gameType.quiz') },
                    { value: "lettres", label: t('options.gameType.lettres') },
                    { value: "memoire", label: t('options.gameType.memoire') },
                    { value: "cooperatif", label: t('options.gameType.cooperatif') },
                    { value: "strategie", label: t('options.gameType.strategie') },
                    { value: "familial", label: t('options.gameType.familial') },
                    { value: "party", label: t('options.gameType.party') },
                    { value: "abstrait", label: t('options.gameType.abstrait') },
                    { value: "expert", label: t('options.gameType.expert') },
                    { value: "deck-building", label: t('options.gameType.deckBuilding') },
                    { value: "enquete", label: t('options.gameType.enquete') },
                    { value: "legacy", label: t('options.gameType.legacy') },
                    { value: "escape", label: t('options.gameType.escape') },
                    { value: "other", label: t('options.gameType.other') },
                  ]}
                />
                <SelectField id="devStage" label={t('fields.devStage')} required value={formData.gameInformation.devStage} onChange={(value) => updateFormDataStruct("gameInformation", "devStage", value)}
                  placeholder={t('placeholders.select')} errorMessage={errors.devStage} items={[
                    { value: "idea", label: t('options.devStage.idea') },
                    { value: "paper", label: t('options.devStage.paper') },
                    { value: "digital", label: t('options.devStage.digital') },
                    { value: "finalized", label: t('options.devStage.finalized') },
                    { value: "published", label: t('options.devStage.published') },
                    { value: "adaptation", label: t('options.devStage.adaptation') },
                    { value: "other", label: t('options.devStage.other') },
                  ]}
                />
              </div>

              {(formData.gameInformation.type === "other" || formData.gameInformation.devStage === "other") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.gameInformation.type === "other" && (<InputField id="gameTypeOther" label={t('fields.gameTypeOther')} required value={formData.gameInformation.typeOther} onChange={(e) => updateFormDataStruct("gameInformation", "typeOther", e.target.value)} errorsMessage={errors.gameTypeOther} />)}
                  {formData.gameInformation.devStage === "other" && (<InputField id="devStageOther" label={t('fields.devStageOther')} required value={formData.gameInformation.devStageOther} onChange={(e) => updateFormDataStruct("gameInformation", "devStageOther", e.target.value)} errorsMessage={errors.devStageOther} />)}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="playerCount" label={t('fields.playerCount')} required value={formData.gameInformation.playerCount} onChange={(e) => updateFormDataStruct("gameInformation", "playerCount", e.target.value)} errorsMessage={errors.playerCount} placeholder={t('placeholders.playerCount')} />
                <InputField id="gameDuration" label={t('fields.gameDuration')} required value={formData.gameInformation.gameDuration} onChange={(e) => updateFormDataStruct("gameInformation", "gameDuration", e.target.value)} errorsMessage={errors.gameDuration} placeholder={t('placeholders.gameDuration')} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField id="recommendedAge" label={t('fields.recommendedAge')} required value={formData.gameInformation.recommendedAge} onChange={(value) => updateFormDataStruct("gameInformation", "recommendedAge", value)}
                  placeholder={t('placeholders.select')} errorMessage={errors.recommendedAge} items={[
                    { value: "3+", label: "3+ ans" },
                    { value: "6+", label: "6+ ans" },
                    { value: "8+", label: "8+ ans" },
                    { value: "10+", label: "10+ ans" },
                    { value: "12+", label: "12+ ans" },
                    { value: "14+", label: "14+ ans" },
                    { value: "16+", label: "16+ ans" },
                    { value: "18+", label: "18+ ans" },
                  ]} />

                <SelectField id="complexity" label={t('fields.complexity')} required value={formData.gameInformation.complexity} onChange={(value) => updateFormDataStruct("gameInformation", "complexity", value)}
                  placeholder={t('placeholders.select')} errorMessage={errors.complexity} items={[
                    { value: "very-simple", label: t('options.complexity.verySimple') },
                    { value: "simple", label: t('options.complexity.simple') },
                    { value: "intermediate", label: t('options.complexity.intermediate') },
                    { value: "complex", label: t('options.complexity.complex') },
                    { value: "very-complex", label: t('options.complexity.veryComplex') },
                  ]} />
              </div>
            </div>
          )}

          {/* Step 3: Game Description */}
          {currentStep === 3 && (
            <div className="space-y-6">

              <TextAreaField id="shortDescription" label={t('fields.shortDescription')} required subLabel={t('fields.shortDescriptionSub')} value={formData.gameDescription.shortDescription} onChange={(e) => updateFormDataStruct("gameDescription", "shortDescription", e.target.value)} errorsMessage={errors.shortDescription} placeholder={t('placeholders.shortDescription')} maxLength={200} />
              <TextAreaField id="detailedDescription" label={t('fields.detailedDescription')} required subLabel={t('fields.detailedDescriptionSub')} value={formData.gameDescription.detailedDescription} onChange={(e) => updateFormDataStruct("gameDescription", "detailedDescription", e.target.value)} errorsMessage={errors.detailedDescription} rows={6} className="min-h-44" />

              <InputField id="mainMechanic" label={t('fields.mainMechanic')} required subLabel={t('fields.mainMechanicSub')} value={formData.gameDescription.mainMechanic} onChange={(e) => updateFormDataStruct("gameDescription", "mainMechanic", e.target.value)} errorsMessage={errors.mainMechanic} placeholder={t('placeholders.mainMechanic')} />
              <InputField id="theme" label={t('fields.theme')} value={formData.gameDescription.theme} onChange={(e) => updateFormDataStruct("gameDescription", "theme", e.target.value)} errorsMessage={errors.theme} placeholder={t('placeholders.theme')} />

              <TextAreaField id="uniqueFeature" label={t('fields.uniqueFeature')} subLabel={t('fields.uniqueFeatureSub')} value={formData.gameDescription.uniqueFeature} onChange={(e) => updateFormDataStruct("gameDescription", "uniqueFeature", e.target.value)} errorsMessage={errors.uniqueFeature} placeholder={t('placeholders.uniqueFeature')} rows={3} />
            </div>
          )}

          {/* Step 4: Media and Resources */}
          {currentStep === 4 && (
            <div className="space-y-6">

              <FileInputField
                id="prototypePhotos"
                label={t('fields.prototypePhotos')}
                required
                multiple
                subLabel={t('fields.prototypePhotosSub')}
                acceptText={t('fileAccept.images')}
                accepts={["image/png", "image/jpeg"]}
                errorMessage={errors.prototypePhotos}
                onChange={(e) => {
                  const incomingFiles = Array.from(e.target.files || []);
                  const existing = formData.gameMedia.photos || [];

                  const filtered = incomingFiles.filter((file) => {
                    const isValidType = ["image/png", "image/jpeg"].includes(file.type);

                    if (!isValidType)
                      return false;
                    const isDuplicate = existing.some((f: File) => f.name === file.name && f.size === file.size);

                    if (isDuplicate)
                      return false;
                    return true;
                  });

                  if (filtered.length === 0)
                    return;
                  updateFormDataStruct("gameMedia", "photos", [...existing, ...filtered]);
                }}
                onDrop={(e) => {
                  e.preventDefault();

                  const incomingFiles = Array.from(e.dataTransfer.files);
                  const existing = formData.gameMedia.photos || [];

                  const filtered = incomingFiles.filter((file) => {
                    const isValidType = ["image/png", "image/jpeg"].includes(file.type);

                    if (!isValidType)
                      return false;
                    const isDuplicate = existing.some((f: File) => f.name === file.name && f.size === file.size);

                    if (isDuplicate)
                      return false;
                    return true;
                  });

                  if (filtered.length === 0)
                    return;
                  updateFormDataStruct("gameMedia", "photos", [...existing, ...filtered]);
                }}
                children={
                  <>
                    {formData.gameMedia.photos && formData.gameMedia.photos.length > 0 && (
                      <div className="flex flex-col gap-3 pt-2">
                        {formData.gameMedia.photos.map((file: File, i: number) => {
                          const url = URL.createObjectURL(file);

                          return (
                            <div key={`prototypePhotos_${i}`} className="relative flex w-full rounded-sm overflow-hidden border p-2">
                              <div className="flex items-center justify-between w-full h-full">
                                <Label htmlFor="prototypePhotos" className="truncate">{file.name}</Label>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size='icon-sm' onClick={() => {
                                    const link = document.createElement("a");

                                    link.href = url;
                                    link.download = file.name;
                                    link.click();
                                  }}>
                                    <FaDownload />
                                  </Button>
                                  <Button variant="destructive" size='icon-sm' onClick={() => updateFormData("gameMedia", {
                                    ...formData.gameMedia,
                                    photos: formData.gameMedia.photos.filter((_, j) => j !== i)
                                  })}>
                                    <FaTrash />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {errors.prototypePhotos && <p className="text-sm text-destructive">{errors.prototypePhotos}</p>}
                  </>
                }
              />

              <FileInputField
                id="rulesDocument"
                label={t('fields.rulesDocument')}
                required
                subLabel={t('fields.rulesDocumentSub')}
                acceptText={t('fileAccept.pdf')}
                accepts={["application/pdf"]}
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  updateFormDataStruct("gameMedia", "rulesDocument", file);
                }}
                onDrop={(e) => {
                  e.preventDefault();

                  const file = e.dataTransfer.files[0];

                  updateFormDataStruct("gameMedia", "rulesDocument", file);
                }}
                errorMessage={errors.rulesDocument}
                children={
                  <>
                    {formData.gameMedia.rulesDocument && (
                      <div className="flex flex-col gap-3 pt-2">
                        <div key={`rulesDocument_${0}`} className="relative flex w-full rounded-sm overflow-hidden border p-2">
                          <div className="flex items-center justify-between w-full h-full">
                            <Label htmlFor="rulesDocument" className="truncate">
                              {formData.gameMedia.rulesDocument.name}
                            </Label>

                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => {
                                  const url = URL.createObjectURL(
                                    formData.gameMedia.rulesDocument!
                                  );
                                  const link = document.createElement("a");

                                  link.href = url;
                                  link.download = formData.gameMedia.rulesDocument!.name;
                                  link.click();

                                  URL.revokeObjectURL(url);
                                }}
                              >
                                <FaDownload />
                              </Button>

                              <Button variant="destructive" size="icon-sm" onClick={() => updateFormDataStruct("gameMedia", "rulesDocument", null)}>
                                <FaTrash />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {errors.rulesDocument && <p className="text-sm text-destructive">{errors.rulesDocument}</p>}
                  </>
                }
              />

              <InputField id="demoVideo" label={t('fields.demoVideo')} subLabel={t('fields.demoVideoSub')} value={formData.gameMedia.demoVideo} onChange={(e) => updateFormDataStruct("gameMedia", "demoVideo", e.target.value)} errorsMessage={errors.demoVideo} placeholder={t('placeholders.demoVideo')} />

              <div className="space-y-2 p-4 bg-[#0479FF]/25 border-[#0479FF] border rounded-lg">
                <p className="text-sm font-medium text-foreground">{t('mediaHelp.title')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('mediaHelp.description')}
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Services Requested */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>{t('fields.services')} *</Label>
                <p className="select-none text-sm text-muted-foreground">
                  {t('fields.servicesSub')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border p-2 rounded-sm">
                    <Checkbox
                      id="fullAdaptation"
                      checked={formData.devis.services.fullAdaptation}
                      onCheckedChange={(checked) =>
                        updateFormDataStruct("devis", "services", {
                          ...formData.devis.services,
                          fullAdaptation: checked
                        })
                      }
                    />
                    <label
                      htmlFor="fullAdaptation"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('services.fullAdaptation')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded-sm">
                    <Checkbox
                      id="mobileApp"
                      checked={formData.devis.services.mobileApp}
                      onCheckedChange={(checked) =>
                        updateFormDataStruct("devis", "services", {
                          ...formData.devis.services,
                          mobileApp: checked
                        })
                      }
                    />
                    <label
                      htmlFor="mobileApp"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('services.mobileApp')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded-sm">
                    <Checkbox
                      id="interactivePrototype"
                      checked={formData.devis.services.interactivePrototype}
                      onCheckedChange={(checked) =>
                        updateFormDataStruct("devis", "services", {
                          ...formData.devis.services,
                          interactivePrototype: checked
                        })
                      }
                    />
                    <label
                      htmlFor="interactivePrototype"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('services.interactivePrototype')}
                    </label>
                  </div>
                </div>
                {errors.services && <p className="text-sm text-destructive">{errors.services}</p>}
              </div>

              <SelectField id="budget" label={t('fields.budget')} required value={formData.devis.budget} onChange={(value) => updateFormDataStruct("devis", "budget", value)}
                errorMessage={errors.budget} placeholder={t('placeholders.select')} items={[
                  { value: "<10k", label: t('options.budget.lessThan10k') },
                  { value: "10k-50k", label: t('options.budget.10kTo50k') },
                  { value: "50k-100k", label: t('options.budget.50kTo100k') },
                  { value: "100k-500k", label: t('options.budget.100kTo500k') },
                  { value: ">500k", label: t('options.budget.moreThan500k') },
                  { value: "tbd", label: t('options.budget.tbd') },
                ]} />

              <SelectField id="deadline" label={t('fields.deadline')} required value={formData.devis.deadline} onChange={(value) => updateFormDataStruct("devis", "deadline", value)}
                errorMessage={errors.deadline} placeholder={t('placeholders.select')} items={[
                  { value: "urgent", label: t('options.deadline.urgent') },
                  { value: "1-3m", label: t('options.deadline.1to3m') },
                  { value: "3-6m", label: t('options.deadline.3to6m') },
                  { value: "6-12m", label: t('options.deadline.6to12m') },
                  { value: ">12m", label: t('options.deadline.moreThan12m') },
                  { value: "flexible", label: t('options.deadline.flexible') },
                ]} />

              <TextAreaField id="additionalInfo" label={t('fields.additionalInfo')} subLabel={t('fields.additionalInfoSub')} value={formData.devis.additionalInfo} onChange={(e) => updateFormDataStruct("devis", "additionalInfo", e.target.value)} errorsMessage={errors.additionalInfo} rows={4} placeholder={t('placeholders.additionalInfo')} />

              <div className="space-y-4 pt-4 border-t">
                <div className="flex flex-col space-y-2">
                  <div className="flex">
                    <div className={cn("flex items-start space-x-2 p-2", errors.confirmAge && "border border-destructive rounded-md")}>
                      <Checkbox
                        id="confirmAge"
                        checked={formData.confirmAge}
                        onCheckedChange={(checked) => updateFormData("confirmAge", checked)}
                      />
                      <label htmlFor="confirmAge" className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", errors.confirmAge && "text-destructive")}>
                        {t('consents.confirmAge')} *
                      </label>
                      {errors.confirmAge && <FaExclamationCircle className="w-4 h-4 text-destructive" />}
                    </div>
                  </div>
                  <div className="font-semibold text-sm px-2">
                    {t.rich('consents.confirmAgeText', {
                      privacy: (value) => <a href={`/${locale}/site-policy/privacy`} className="hover:underline text-primary">{value}</a>
                    })}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-start space-x-2 pl-2">
                    <Checkbox
                      id="acceptCommunications"
                      checked={formData.acceptCommunications}
                      onCheckedChange={(checked) => updateFormData("acceptCommunications", checked)}
                    />
                    <label
                      htmlFor="acceptCommunications"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('consents.acceptCommunications')}
                    </label>
                  </div>
                  <div className="font-semibold text-sm px-2">
                    {t.rich('consents.acceptCommunicationsText', {
                      privacy: (value) => <a href={`/${locale}/site-policy/privacy`} className="hover:underline text-primary">{value}</a>
                    })}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex">
                    <div className={cn("flex items-start space-x-2 p-2", errors.acceptDataProcessing && "border border-destructive rounded-md")}>
                      <Checkbox
                        id="acceptDataProcessing"
                        checked={formData.acceptDataProcessing}
                        onCheckedChange={(checked) => updateFormData("acceptDataProcessing", checked)}
                      />
                      <label htmlFor="acceptDataProcessing" className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", errors.acceptDataProcessing && "text-destructive")}>
                        {t('consents.acceptDataProcessing')} *
                      </label>
                      {errors.acceptDataProcessing && <FaExclamationCircle className="w-4 h-4 text-destructive" />}
                    </div>
                  </div>
                  <div className="font-semibold text-sm px-2">
                    {t.rich('consents.acceptDataProcessingText', {
                      privacy: (value) => <a href={`/${locale}/site-policy/privacy`} className="hover:underline text-primary">{value}</a>
                    })}
                  </div>

                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8 max-w-4xl mx-auto">
        <CardContent>
          <div className="flex justify-between items-center">
            <Button type="button" variant="default" size='lg' onClick={handlePrevious} disabled={currentStep === 1}>
              <FaAngleLeft />
              {!isMobile && t('buttons.previous')}
            </Button>

            <Label>
              {t('navigation.step')} {currentStep} {t('navigation.of')} {steps.length}
            </Label>

            {currentStep < 5 ? (
              <Button type="button" variant="default" size='lg' onClick={handleNext}>
                {!isMobile && t('buttons.next')}
                <FaAngleRight />
              </Button>
            ) : (
              <Button type="button" variant="default" size='lg' onClick={handleSubmit} disabled={isSubmitting}>
                {!isMobile && (isSubmitting ? t('toast.loading') : t('buttons.submit'))}
                <FaAngleRight />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Container >
  );
}
