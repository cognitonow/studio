'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Review } from "@/lib/types";
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Quote } from 'lucide-react'

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline text-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-base text-muted-foreground">Hear from our community of satisfied clients.</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative mt-12"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <Quote className="w-8 h-8 text-primary/50 mb-4" />
                    <p className="text-muted-foreground">{review.comment}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatarUrl} alt={`${review.author}'s profile picture`} data-ai-hint={review.dataAiHint} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">{review.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
}
