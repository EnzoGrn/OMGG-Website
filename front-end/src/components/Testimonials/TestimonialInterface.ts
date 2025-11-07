import { LogoProps } from "../Section/Interface";

export interface AttestantProps {
    firstName:      string;
    lastName:       string;
    role:           string;
    profilePicture: LogoProps;
}

export interface TestimonialProps {
    testimonial: string;
    attestant:   AttestantProps;
}

export interface TestimonialsProps {
    testimonials: TestimonialProps[];
    maxTestimonials:  number;
}