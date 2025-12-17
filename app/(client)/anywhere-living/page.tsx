"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const anywhereLivingData = [
  {
    title: "BACKYARD LIVING",
    description:
      "A turnkey way to add real, private living space to your property without permits, construction, or disruption. It arrives fully finished, operates independently from your home’s utilities, and can be relocated or repositioned anytime.",
    items: [
      "Guest House",
      "Mother-in-Law Suite",
      "Backyard Residence",
      "Teen Suite",
      "Home Office",
      "She Shed / Man Cave",
      "Studio or Creative Space",
      "Private Retreat",
      "Temporary Housing During Remodel",
      "Overflow Sleeping Space for Holidays",
      "Caregiver or Nurse Quarters",
    ],
  },
  {
    title: "RENTAL INCOME",
    description:
      "A finished home you can place on almost any property and start renting immediately without permits. It’s self sufficient from day one and can be moved as demand shifts.",
    items: [
      "Airbnb / Short-Term Rental",
      "Long-Term Rental",
      "Mid-Term Rental (travel nurses, corporate stays)",
      "Backyard ADU Rental",
      "Construction Site Office Rental",
      "On-Property Rental for College Students",
      "Seasonal Worker Housing",
      "Event or Festival Rental Unit",
      "Mobile Rental (if placed on a trailer)",
    ],
  },
  {
    title: "WORK AND CREATIVE SPACE",
    description:
      "A quiet, climate controlled workspace that arrives finished and ready to use. It runs independently and can be moved or repositioned as your workflow evolves.",
    items: [
      "Office",
      "Workshop",
      "Art or music studio",
      "Therapy or client space",
      "Startup or small business HQ",
      "Anywhere Private Office",
      "Construction Site Office",
      "Jobsite Break Room",
      "Retail Pop-Up",
      "Barber / Salon Studio",
      "Therapy or Counseling Office",
      "Photography Studio",
      "Farm Worker Housing",
      "Security Office",
      "Storage + Workspace Combo",
    ],
  },
  {
    title: "OFF-GRID LIVING",
    description:
      "A steel home built for independence — delivered finished, ready for solar, and functional without sewer or water hookups.",
    items: [
      "Off-Grid Cabin",
      "Solar-Powered Retreat",
      "Remote Work Hideaway",
      "Hunting / Fishing Basecamp",
      "Camping Upgrade",
      "Mobile Tiny Home (on a trailer)",
      "Seasonal Cabin (mountains, desert, coast)",
      "Emergency Shelter",
      "Fire-Resistant Backup Home",
      "Disaster-Resilient Housing",
    ],
  },
  {
    title: "COMMUNITY AND EXPANSION",
    description:
      "Build flexible, scalable living arrangements with multiple finished units — permit free, self sufficient, and movable.",
    items: [
      "Transitional Housing",
      "Emergency Response Housing",
      "Homeless Outreach Units",
      "Disaster Relief Housing",
      "Fire-Resistant Community Shelters",
      "Temporary Classrooms",
      "Medical Triage Rooms",
    ],
  },
]

export default function AnywhereLivingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="max-w-4xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Anywhere Living
        </h1>
        <p className="text-gray-600">
          Live anywhere. Move anytime. One home, endless possibilities.
          A Freepoint Home gives you engineered, permanent strength with the freedom
          to live wherever life takes you — and the ability to move it just as easily.
        </p>
      </div>

      {/* Accordion Sections */}
      <Accordion type="multiple" className="space-y-6">
        {anywhereLivingData.map((section, index) => (
          <AccordionItem
            key={index}
            value={`section-${index}`}
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="text-lg font-semibold text-[#4A4C56] tracking-wide">
              {section.title}
            </AccordionTrigger>

            <AccordionContent className="pt-4 space-y-4">
              <p className="text-gray-600">{section.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6">
          Ready to see what your Freepoint Home can become?
        </p>
        <a href="/customizations">
          <button className="bg-[#C2A45C] hover:bg-[#C2A45C]/80 transition-all duration-300 text-white px-10 py-4 rounded-md font-semibold">
            Customize Your Home
          </button>
        </a>
      </div>
    </div>
  )
}
