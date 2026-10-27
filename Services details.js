/**
 * FORGELUX — Service Details Page JavaScript
 * Handles: URL parameter reading, service data mapping, dynamic DOM rendering,
 *          FAQ accordion, theme, RTL, mobile nav, sticky header.
 *
 * URL Format: Services Details.html?service=<serviceId>
 * Valid IDs: paint-consultation | paint-mixing | hardware-installation |
 *            electrical-plumbing | bulk-contractor-supply | delivery
 */

/* ==========================================================================
   SERVICE DATA OBJECT
   Each key is a URL parameter value. All content sourced/adapted from
   FORGELUX business information — no fabricated policies, prices, or guarantees.
   ========================================================================== */
const SERVICES = {
  'paint-consultation': {
    title: 'Paint Consultation & Colour Selection',
    eyebrow: 'PAINT ADVISORY',
    badgeText: 'FORGELUX PAINT ADVISORY',
    shortDesc: 'Our in-store paint advisors help you choose the right colours and finishes for any interior or exterior project — from wall emulsions to specialist architectural coatings. No guesswork, just clear, practical guidance.',
    image: 'assets/images/service_paint_consultation.jpg',
    imageAlt: 'Paint colour consultation with expert advisor reviewing colour swatches',
    pageTitle: 'Paint Consultation & Colour Selection — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'Expert Colour Guidance for Your Project',
        paragraphs: [
          'Our paint consultation service gives you access to experienced in-store colour advisors who can help you navigate the wide range of paint products we stock. Whether you\'re painting a single room, an entire home, or an external facade, our team will help you make confident, informed decisions.',
          'During a consultation, our advisors discuss your project requirements — room usage, natural lighting, surface type, and finish preferences — to help narrow down suitable paint options from our range of interior and exterior paints, primers, and specialist coatings.'
        ],
        list: [
          'Guidance on interior vs exterior paint suitability',
          'Sheen level recommendations — flat, eggshell, satin, semi-gloss',
          'Surface preparation considerations and primer selection',
          'Colour pairing and contrast recommendations',
          'Sample selection and swatch reference support'
        ]
      },
      {
        subtitle: 'Who Benefits',
        heading: 'Ideal For Homeowners, Designers & Contractors',
        paragraphs: [
          'Whether you\'re a first-time homeowner refreshing a bedroom or an interior designer specifying finishes for a full property, our advisors can assist at any scale. Contractors managing multiple site specifications are also welcome to discuss project requirements at our trade counter.',
          'Before visiting, it helps to have an idea of the room dimensions, the current wall colour (if changing), and any fabric or material swatches that you\'d like to complement with your paint choice.'
        ]
      }
    ],
    features: [
      'Interior & exterior paint range reviewed together',
      'Sheen level & finish recommendations',
      'Colour swatch & sample card support',
      'Surface compatibility guidance',
      'Primer & prep product recommendations',
      'No appointment required for standard consultation'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
        title: 'Confident Colour Decisions',
        desc: 'Leave with a clear plan rather than a guess. Our advisors help you understand finish options and colour interactions before you commit.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        title: 'Avoid Costly Mistakes',
        desc: 'Choosing the wrong sheen or paint type for a surface can lead to adhesion failures or premature wear. Expert guidance helps you avoid these pitfalls.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        title: 'Personalised to Your Project',
        desc: 'Every consultation is tailored to your specific room, surfaces, and requirements — not a generic recommendation.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        title: 'In-Store Swatch Reference',
        desc: 'Browse our full range of colour swatches and fan decks in-store to see true colours in natural light before selecting.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Browse & Identify',
        desc: 'Visit our showroom and explore our paint range. Bring any inspiration images, existing swatches, or material samples to help communicate your vision.'
      },
      {
        num: '2',
        title: 'Speak With Our Advisor',
        desc: 'Our in-store colour advisor will discuss your project requirements, the surfaces involved, and recommend suitable paint types and finishes.'
      },
      {
        num: '3',
        title: 'Select & Purchase',
        desc: 'Choose from our swatch range and confirm your selections. Sample pots are available for most colours so you can test before committing to full quantities.'
      }
    ],
    related: ['paint-mixing', 'hardware-installation', 'delivery'],
    faqs: [
      {
        q: 'Do I need to book an appointment for a paint consultation?',
        a: 'For standard in-store consultations, no appointment is needed — our advisors are available during regular store hours. If you have a large or complex project, contacting us in advance allows us to allocate more time for your visit.'
      },
      {
        q: 'Can you help me match a paint colour I saw in a magazine or online?',
        a: 'Yes. Bring your reference image or material sample to the store and our advisors can help identify a close match from our range. For precision colour matching, we also offer our custom paint mixing service.'
      },
      {
        q: 'What information should I bring to my consultation?',
        a: 'It\'s helpful to bring the room dimensions, the current wall colour or a chip of existing paint, any fabric or tile samples you\'d like to complement, and photos of the space if possible. This helps our advisors make more relevant recommendations.'
      },
      {
        q: 'Do you offer paint consultation for exterior projects?',
        a: 'Yes. Our advisors can discuss exterior paint suitability, weatherproofing finishes, masonry coatings, and surface preparation requirements for outdoor projects.'
      },
      {
        q: 'Can your advisors recommend a primer for my project?',
        a: 'Absolutely. Primer selection depends on the surface being painted and the topcoat being used. Our advisors will recommend a suitable primer as part of any paint consultation.'
      }
    ]
  },

  'paint-mixing': {
    title: 'Custom Paint Mixing & Colour Matching',
    eyebrow: 'CUSTOM TINTING',
    badgeText: 'FORGELUX CUSTOM MIXING',
    shortDesc: 'We mix paint to your exact colour requirements using computerised tinting equipment. Whether you need to match an existing colour or create something completely bespoke, our team produces consistent, repeatable results.',
    image: 'assets/images/service_paint_mixing.jpg',
    imageAlt: 'Custom paint mixing and colour matching with computerised tinting equipment',
    pageTitle: 'Custom Paint Mixing & Colour Matching — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'Precision Tinting & Colour Replication',
        paragraphs: [
          'Our custom paint mixing service uses computerised tinting equipment to produce paint in virtually any colour across a wide range of bases and finishes. Whether you\'re replicating an existing wall colour, matching a heritage shade, or creating a bespoke tint from a reference, we can produce a consistent, accurate result.',
          'Bring in your reference — a paint chip, a piece of fabric, a tile, or even a digital colour code — and our team will assess the most achievable match from our tinting system. We can mix paint in most finishes including flat, matte, eggshell, satin, and semi-gloss.'
        ],
        list: [
          'Computerised tinting for consistent repeatable results',
          'Colour matching from physical samples or reference codes',
          'Available across multiple paint bases and finishes',
          'Interior and exterior formulations available',
          'Small and large quantity mixing available',
          'Custom colour enquiries welcome in advance'
        ]
      },
      {
        subtitle: 'How Colour Matching Works',
        heading: 'Bringing Your Reference Colour to Life',
        paragraphs: [
          'Colour matching accuracy depends on the quality and condition of the reference provided. Faded paint chips or heavily textured samples may affect the match. Our team will advise on the closest achievable result and provide a sample tin where available for your review before committing to a full mix.',
          'If you\'re working from a paint manufacturer\'s code (such as RAL, NCS, or BS colour references), please bring that reference and our advisors can identify the closest formulation within our available bases.'
        ]
      }
    ],
    features: [
      'Computerised tinting system for accuracy',
      'Physical sample & colour code matching',
      'Multiple base and finish options',
      'Interior & exterior formulations',
      'Sample tins available for review',
      'Custom colour enquiries welcome'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path><circle cx="12" cy="12" r="4"></circle></svg>',
        title: 'Consistent Repeatable Results',
        desc: 'Computerised tinting records formulas precisely so the same colour can be remixed accurately if you need more later.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>',
        title: 'Wide Colour Range',
        desc: 'Our tinting system provides access to thousands of possible colours across interior and exterior formulations in a variety of finishes.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
        title: 'Match Existing Colours',
        desc: 'Replicate your existing wall paint accurately when patching, touching up, or extending a room — even if the original manufacturer is unknown.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
        title: 'Any Finish Available',
        desc: 'Mix in flat, matte, eggshell, satin, or semi-gloss depending on your surface and usage requirements.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Bring Your Reference',
        desc: 'Visit the store with your colour reference — a paint chip, a sample of existing paint, a tile, fabric swatch, or a paint manufacturer code (RAL, NCS, BS, etc.).'
      },
      {
        num: '2',
        title: 'Advise & Formulate',
        desc: 'Our team assesses your reference and identifies the closest achievable match using our tinting system. We\'ll discuss the base type and finish that suits your application.'
      },
      {
        num: '3',
        title: 'Mix & Review',
        desc: 'We mix your colour and can provide a sample tin for you to test in situ before committing to the full quantity. Once confirmed, your full batch is mixed and ready to collect.'
      }
    ],
    related: ['paint-consultation', 'hardware-installation', 'delivery'],
    faqs: [
      {
        q: 'Can you match any paint colour?',
        a: 'We can match a very wide range of colours using our computerised tinting system. The accuracy of the match depends on the quality of the reference provided. Faded, weathered, or highly textured samples may limit precision. We\'ll always advise honestly on what\'s achievable.'
      },
      {
        q: 'Can I match a colour from another brand\'s paint range?',
        a: 'In many cases, yes. If you have the manufacturer\'s colour name or code, we can often formulate a close match within our available bases. Bring the reference in and we\'ll advise on the best approach.'
      },
      {
        q: 'How long does custom paint mixing take?',
        a: 'Most standard mixing is completed quickly in-store. Turnaround time depends on the quantity required and current demand. Contact us or ask in-store for a more accurate estimate for your specific needs.'
      },
      {
        q: 'Can I order additional quantities of a custom colour at a later date?',
        a: 'Yes. Our computerised system records tint formulas, allowing us to remix the same colour accurately. Bring your previous reference or inform us of the colour you had mixed and we can locate the formula.'
      },
      {
        q: 'What do I need to provide for a custom mix enquiry?',
        a: 'A physical colour reference (paint chip, sample, swatch) is ideal. If you\'re working from a digital colour code such as RAL, NCS, BS, or a HEX value, we can use that as a starting point, though physical approval is always recommended before a large batch is produced.'
      }
    ]
  },

  'hardware-installation': {
    title: 'Hardware Selection & Installation Support',
    eyebrow: 'HARDWARE ADVISORY',
    badgeText: 'FORGELUX HARDWARE',
    shortDesc: 'Our hardware specialists help you select the right fittings, handles, hinges, locks, and accessories for your project. We provide clear product compatibility guidance and installation advice to help you make informed choices.',
    image: 'assets/images/service_hardware_selection.jpg',
    imageAlt: 'Premium architectural hardware display with brass door handles, hinges and pulls',
    pageTitle: 'Hardware Selection & Installation Support — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'Product Selection Guidance Across Our Full Hardware Range',
        paragraphs: [
          'Choosing the right architectural hardware requires knowledge of door thicknesses, material compatibility, finish durability, and load ratings. Our hardware advisors are trained to help you identify the most suitable products from our extensive range of door hardware, cabinet fittings, locks, hinges, handles, and building hardware.',
          'We stock hardware in a variety of finishes including brass, bronze, stainless steel, chrome, satin nickel, and powder-coated options. Our advisors can guide you on which finish best suits your environment and maintenance requirements.'
        ],
        list: [
          'Door handles, lever sets, knobs, and mortise sets',
          'Cabinet pulls, knobs, and drawer runners',
          'Hinges — ball bearing, spring, pivot, and concealed types',
          'Locks and security hardware selection',
          'Gate, fence, and external hardware',
          'Building fixings, anchors, and structural connectors'
        ]
      },
      {
        subtitle: 'Installation Guidance',
        heading: 'Practical Advice to Support Your Installation',
        paragraphs: [
          'While FORGELUX does not offer a direct installation service, our hardware specialists can provide practical guidance on correct installation methods, the tools required, and the relevant specifications to ensure your chosen hardware performs as intended.',
          'For complex installations or heritage restoration projects, our advisors can recommend the appropriate type of hardware and advise on compatibility with your existing door frames, furniture, or fixings. We also stock a wide range of installation tools, drill bits, and fixing accessories to support your project.'
        ]
      }
    ],
    features: [
      'Wide range of architectural hardware in-store',
      'Multiple finish options explained and compared',
      'Door & cabinet hardware compatibility advice',
      'Lock & security product guidance',
      'Installation method & tool recommendations',
      'Building fixings, anchors, and structural connectors'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
        title: 'Right Product, First Time',
        desc: 'Expert guidance means you select hardware that fits correctly and performs as required — avoiding costly returns or replacements.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.18 0l9.95-6.13a2 2 0 0 0 .94-1.7V8.1a2 2 0 0 0-.88-1.7Z"></path></svg>',
        title: 'Finish & Durability Guidance',
        desc: 'Understand which hardware finishes are best suited to interior, exterior, coastal, or high-traffic environments before purchasing.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline><line x1="13" y1="19" x2="19" y2="13"></line><line x1="16" y1="16" x2="20" y2="20"></line><line x1="19" y1="21" x2="21" y2="19"></line></svg>',
        title: 'Installation Advice Included',
        desc: 'Our advisors can explain installation processes and the tools required, helping you plan your work accurately before you begin.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
        title: 'Extensive In-Stock Range',
        desc: 'Browse a comprehensive selection of architectural hardware in-store across multiple brands, finishes, and grades — all available to take away the same day.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Identify Your Requirements',
        desc: 'Visit the store with your project details — door type and thickness, material, location (interior or exterior), and any existing hardware dimensions if replacing.'
      },
      {
        num: '2',
        title: 'Consult With Our Specialist',
        desc: 'Our hardware advisor will review your requirements, show you compatible options from our range, explain the differences in grade and finish, and advise on installation considerations.'
      },
      {
        num: '3',
        title: 'Select & Take Away',
        desc: 'Choose the products that best meet your requirements. Most items are available to take away the same day. For specialist or high-volume orders, contact us in advance.'
      }
    ],
    related: ['paint-consultation', 'electrical-plumbing', 'bulk-contractor-supply'],
    faqs: [
      {
        q: 'Do you stock architectural grade hardware for high-traffic doors?',
        a: 'Yes. We stock heavy-duty architectural hardware rated for high-use applications, including ball-bearing hinges, mortise lock sets, and heavy-grade door closers. Our advisors can help you identify the appropriate specification for your door and usage level.'
      },
      {
        q: 'Can you help me choose hardware that suits both aesthetics and durability?',
        a: 'Absolutely. Our advisors can help you select hardware that balances aesthetic preference with the practical requirements of your environment — such as corrosion resistance for external or coastal applications, or finish consistency across multiple doors in a project.'
      },
      {
        q: 'Do you offer hardware in a specific finish to match existing items?',
        a: 'We stock hardware in a range of finishes. If you\'re trying to match existing hardware, bring a sample to the store and our advisors can identify the closest available match from our range.'
      },
      {
        q: 'Can you advise on hardware compatibility with my existing door frame?',
        a: 'Yes. Our advisors can advise on standard door preparation dimensions for our hardware products and help identify suitable options for your existing door or frame construction.'
      }
    ]
  },

  'electrical-plumbing': {
    title: 'Electrical & Plumbing Supplies',
    eyebrow: 'ELECTRICAL & PLUMBING',
    badgeText: 'FORGELUX SUPPLIES',
    shortDesc: 'Browse our extensive range of electrical and plumbing supplies. Our team assists with product identification, compatibility checking, and material selection — helping you find the right components for your project quickly and efficiently.',
    image: 'assets/images/service_electrical_plumbing.jpg',
    imageAlt: 'Electrical and plumbing supplies aisle with copper fittings and pipe fixtures',
    pageTitle: 'Electrical & Plumbing Supplies — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'A Comprehensive Range of Electrical & Plumbing Products',
        paragraphs: [
          'FORGELUX stocks a broad selection of electrical accessories and plumbing materials suited to residential, commercial, and light industrial applications. Our in-store team can assist you in locating the right product, checking compatibility with your existing system, and identifying alternatives when a specific item is unavailable.',
          'We carry electrical accessories including switches, sockets, cable management, conduit, and wiring accessories, alongside a plumbing range covering pipe fittings, valves, tap connectors, copper and plastic pipe, and related installation materials.'
        ],
        list: [
          'Electrical switches, sockets, and wiring accessories',
          'Conduit, cable management, and trunking',
          'Copper, PVC, and compression pipe fittings',
          'Stop valves, gate valves, and ball valves',
          'Tap connectors, flexible hoses, and isolation valves',
          'Pipe clips, brackets, and sundry plumbing materials'
        ]
      },
      {
        subtitle: 'Product Assistance',
        heading: 'Help Finding the Right Components',
        paragraphs: [
          'If you\'re unsure which product you need, our team can assist. Bring a photograph of the existing fitting, a sample of the item being replaced, or a description of the application and our staff will help you identify the most appropriate product from our range.',
          'Please note that FORGELUX is a supply retailer and does not provide licensed electrical or plumbing installation services. Any installation work should be carried out by a qualified and suitably licensed tradesperson in accordance with local regulations.'
        ]
      }
    ],
    features: [
      'Electrical accessories — switches, sockets, conduit',
      'Plumbing — pipe, fittings, valves, and connectors',
      'Product identification & compatibility assistance',
      'Alternative product suggestions when needed',
      'Suitable for residential & commercial projects',
      'Trade and retail quantities available'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
        title: 'Wide Product Range',
        desc: 'A comprehensive selection of electrical and plumbing components available in-store, reducing the need for multiple supplier visits.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        title: 'Product Identification Help',
        desc: 'Unsure of the product name or specification? Bring your sample or photo and our team will help you identify what you need.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
        title: 'Compatibility Checks',
        desc: 'Our staff can advise on product compatibility — such as pipe diameter matching, valve thread sizes, or socket types — before you purchase.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
        title: 'Same-Day Availability',
        desc: 'Most standard electrical and plumbing components are held in stock for immediate collection — reducing project delays.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Bring Your Reference',
        desc: 'Visit the store with the old or broken fitting, a photograph, or a clear description of what you need. Include any relevant dimensions, thread sizes, or specifications if known.'
      },
      {
        num: '2',
        title: 'Get Product Guidance',
        desc: 'Our team will identify a suitable product from our range, check compatibility with your application, and explain any relevant installation considerations.'
      },
      {
        num: '3',
        title: 'Collect Your Materials',
        desc: 'Purchase and take away the identified components the same day in most cases. For larger or project-quantity requirements, speak with our trade counter about availability.'
      }
    ],
    related: ['hardware-installation', 'bulk-contractor-supply', 'delivery'],
    faqs: [
      {
        q: 'Do you offer licensed electrical or plumbing installation services?',
        a: 'No. FORGELUX is a supply retailer and does not provide licensed installation services. All installation work should be carried out by a suitably qualified and licensed tradesperson in accordance with applicable local regulations and standards.'
      },
      {
        q: 'Can your staff help me identify a plumbing fitting I need to replace?',
        a: 'Yes. Bring the old fitting or a clear photograph to the store and our team will do their best to identify a compatible replacement from our range. Knowing the pipe diameter and thread type in advance is helpful but not always essential.'
      },
      {
        q: 'Do you stock cable and conduit for electrical installations?',
        a: 'Yes. We stock a range of electrical conduit, cable management trunking, and wiring accessories. Please confirm the specific type and size you require, and our team will advise on what\'s available in-store.'
      },
      {
        q: 'Can I get advice on which pipe type is most suitable for my application?',
        a: 'Our staff can provide general guidance on the characteristics of different pipe materials — such as copper, push-fit, or solvent-weld PVC — and their typical applications. For specific technical decisions on regulated systems, a licensed plumber should be consulted.'
      }
    ]
  },

  'bulk-contractor-supply': {
    title: 'Bulk & Contractor Supply',
    eyebrow: 'TRADE & CONTRACTOR',
    badgeText: 'FORGELUX TRADE SUPPLY',
    shortDesc: 'FORGELUX supports contractors, builders, and trade professionals with bulk product availability and project-quantity sourcing across our full range of hardware, paint, fixings, and building supplies. Contact us to discuss your project requirements.',
    image: 'assets/images/service_bulk_contractor.jpg',
    imageAlt: 'Bulk contractor supply warehouse with pallets of materials and bulk hardware',
    pageTitle: 'Bulk & Contractor Supply — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'Project-Quantity Supply for Trade & Commercial Use',
        paragraphs: [
          'Whether you\'re managing a single residential build, a multi-unit development, or an ongoing series of commercial fit-outs, FORGELUX can discuss your bulk purchasing requirements across our range of architectural hardware, paint and finishes, structural fasteners, and building sundries.',
          'Our trade counter is staffed by experienced advisors who understand project requirements and can assist with product sourcing, quantity confirmation, and scheduling. We encourage contractors to contact us ahead of major product requirements so we can plan for availability and provide timely assistance.'
        ],
        list: [
          'Bulk quantities across hardware, paint, and fixings',
          'Project-quantity sourcing and availability confirmation',
          'Trade counter staffed by experienced advisors',
          'Account enquiries welcome for repeat trade customers',
          'Custom paint mixing available in project quantities',
          'Contact us in advance for large or specialist requirements'
        ]
      },
      {
        subtitle: 'How to Enquire',
        heading: 'Getting Started With a Bulk Order Enquiry',
        paragraphs: [
          'For large or project-specific quantity requirements, we recommend contacting our trade counter in advance. This allows us to confirm stock levels, provide lead times for any items that need to be sourced, and ensure your visit to the store is as efficient as possible.',
          'Please note that bulk pricing arrangements are subject to separate enquiry and are not automatically applied at the point of sale. Contact us to discuss your project and we will advise on available options.'
        ]
      }
    ],
    features: [
      'Bulk hardware, paint, and fixings available',
      'Project quantity sourcing and confirmation',
      'Trade counter with experienced advisors',
      'Repeat-trade account enquiries welcome',
      'Large quantity custom paint mixing',
      'Contact us in advance for specialist supply'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
        title: 'One Source, Full Range',
        desc: 'Source hardware, paint, fixings, and plumbing supplies from one location — reducing time spent across multiple suppliers.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        title: 'Dedicated Trade Counter',
        desc: 'Our trade counter is staffed by advisors familiar with project requirements — not just retail transactions.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        title: 'Reliable Stock Planning',
        desc: 'Contact us ahead of your project needs and we\'ll confirm availability and advise on lead times for any items requiring sourcing.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
        title: 'Account Enquiries Welcome',
        desc: 'Regular trade customers are encouraged to enquire about account arrangements. Contact us to discuss your trading requirements.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Define Your Requirements',
        desc: 'Prepare a list of the products and approximate quantities you need. Include product descriptions, dimensions, finishes, and any relevant specifications.'
      },
      {
        num: '2',
        title: 'Contact Our Trade Counter',
        desc: 'Reach out by phone or in-store to discuss your requirements. Our trade counter advisors will confirm availability, provide lead times, and advise on any alternatives where needed.'
      },
      {
        num: '3',
        title: 'Collect or Arrange Delivery',
        desc: 'Collect your order from the store or enquire about our delivery service for project quantities. Our team will confirm the best fulfilment option for your specific situation.'
      }
    ],
    related: ['hardware-installation', 'electrical-plumbing', 'delivery'],
    faqs: [
      {
        q: 'Do you offer trade accounts for regular contractors?',
        a: 'We welcome enquiries from regular trade customers about account arrangements. Please contact our trade counter directly to discuss your trading requirements and frequency. Account terms are assessed on a case-by-case basis.'
      },
      {
        q: 'How far in advance should I contact you for a large order?',
        a: 'For large or specialist orders, we recommend contacting us as early as possible — ideally when you\'re planning your project rather than at the point of immediate need. This allows us to confirm stock levels and arrange sourcing if required.'
      },
      {
        q: 'Can you supply paint in project quantities?',
        a: 'Yes. We can mix and supply custom tinted paint in larger quantities for project use. Contact our paint desk in advance with your colour specification, required quantity, and finish requirements.'
      },
      {
        q: 'Do you have a minimum order value for bulk enquiries?',
        a: 'There is no fixed minimum order value for most products. However, certain bulk pricing discussions or account arrangements may have minimum volume requirements. Contact us to discuss your specific situation.'
      },
      {
        q: 'Can I collect my bulk order from the store?',
        a: 'Yes. Orders can be collected from our store during trading hours. For very large orders, it may be helpful to contact us in advance to ensure the order is staged and ready for efficient collection. Delivery enquiries can also be directed to our team.'
      }
    ]
  },

  'delivery': {
    title: 'Home Delivery & Order Assistance',
    eyebrow: 'DELIVERY SERVICE',
    badgeText: 'FORGELUX DELIVERY',
    shortDesc: 'Ask about our delivery options for hardware, paint, and building supplies. Our team assists with order preparation and can discuss delivery arrangements to make your purchasing experience as convenient as possible.',
    image: 'assets/images/service_delivery.jpg',
    imageAlt: 'FORGELUX delivery service — professional loading hardware orders for dispatch',
    pageTitle: 'Home Delivery & Order Assistance — FORGELUX Services',
    bodyContent: [
      {
        subtitle: 'What This Service Includes',
        heading: 'Convenient Delivery & Order Support',
        paragraphs: [
          'FORGELUX provides delivery and order assistance for customers who are unable to collect in-store, have large or heavy orders, or would benefit from scheduled delivery to a project site. Our team can discuss your delivery requirements and confirm the options available for your specific order.',
          'Order assistance includes help with compiling your order, identifying the right products, confirming quantities, and coordinating the collection or dispatch of your purchase. Contact us to enquire about delivery to your location and the arrangements that apply.'
        ],
        list: [
          'Delivery available for hardware, paint, and supplies',
          'Order compilation and assistance in-store or by phone',
          'Large or heavy item dispatch coordination',
          'Contact us for delivery availability to your location',
          'Project site delivery enquiries welcome',
          'Delivery terms confirmed at point of enquiry'
        ]
      },
      {
        subtitle: 'How to Arrange Delivery',
        heading: 'Organising Your Order & Delivery',
        paragraphs: [
          'To enquire about delivery, contact us by phone or visit the store. Our team will confirm whether delivery is available to your location, advise on lead times, and discuss any relevant terms that apply to your order.',
          'Please note that delivery availability, areas served, and applicable terms are confirmed directly at the time of enquiry. We do not guarantee delivery timelines or areas on this website, as these depend on the nature of the order and current operational capacity.'
        ]
      }
    ],
    features: [
      'Delivery enquiries welcome for most products',
      'Large & heavy item dispatch coordination',
      'In-store order compilation assistance',
      'Project site delivery discussion available',
      'Delivery terms confirmed at enquiry stage',
      'Phone & in-store enquiry both supported'
    ],
    benefits: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
        title: 'Convenient for Large Orders',
        desc: 'Delivery is particularly useful when your order is large, heavy, or involves products that are difficult to transport independently.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
        title: 'Project Site Coordination',
        desc: 'We can discuss delivery arrangements to project sites, allowing your team to plan without disruption to the work schedule.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        title: 'Order Assistance Included',
        desc: 'Not sure how to compile your order? Our team can help you identify products, confirm quantities, and prepare your order for despatch.'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        title: 'Direct Enquiry Support',
        desc: 'Speak with our team directly by phone or in-store to discuss your specific delivery requirements and get accurate, up-to-date information.'
      }
    ],
    steps: [
      {
        num: '1',
        title: 'Prepare Your Order Details',
        desc: 'Have a list of the products you require ready, including quantities and any relevant specifications. Note your delivery address and any access considerations for the site.'
      },
      {
        num: '2',
        title: 'Contact Us to Enquire',
        desc: 'Phone or visit the store to discuss your delivery requirements. Our team will confirm availability, applicable terms, and lead times based on your order and location.'
      },
      {
        num: '3',
        title: 'Confirm & Dispatch',
        desc: 'Once your delivery arrangement is confirmed, your order is prepared and dispatched according to the agreed schedule. Our team will keep you informed at each stage.'
      }
    ],
    related: ['bulk-contractor-supply', 'hardware-installation', 'electrical-plumbing'],
    faqs: [
      {
        q: 'Do you deliver to all areas?',
        a: 'Delivery availability depends on your location and the nature of your order. Please contact us directly to confirm whether delivery to your address is available and what terms apply. We do not publish fixed delivery zones on this website, as availability may vary.'
      },
      {
        q: 'How do I arrange delivery for a large or heavy order?',
        a: 'Contact our team by phone or in-store. Describe your order and delivery location and we\'ll confirm whether delivery is available, advise on any applicable terms, and coordinate the despatch schedule with you.'
      },
      {
        q: 'Can you deliver to a building site or project address?',
        a: 'Project site delivery enquiries are welcome. Please discuss the specific access requirements, any staging needs, and the preferred delivery schedule with our team so we can advise on what\'s achievable for your situation.'
      },
      {
        q: 'Do you offer same-day delivery?',
        a: 'We cannot guarantee same-day delivery. Lead times depend on the order, your location, and current operational availability. Please contact us as early as possible to discuss your requirements and get an accurate timeline.'
      },
      {
        q: 'Can I pick up my order in-store if delivery is not available?',
        a: 'Yes. In-store collection is always available during our trading hours. Most products are held in stock for same-day collection. Contact us in advance for large or specialist orders to ensure your items are prepared and ready.'
      }
    ]
  }
};

/* ==========================================================================
   RELATED SERVICES LOOKUP (for cross-linking)
   ========================================================================== */
const RELATED_META = {
  'paint-consultation': {
    tag: 'Paint Advisory',
    title: 'Paint Consultation & Colour Selection',
    desc: 'Expert guidance on choosing the right colours and finishes for your project.',
    image: 'assets/images/service_paint_consultation.jpg',
    imageAlt: 'Paint colour consultation'
  },
  'paint-mixing': {
    tag: 'Custom Tinting',
    title: 'Custom Paint Mixing & Matching',
    desc: 'Accurate computerised colour mixing and matching for any project.',
    image: 'assets/images/service_paint_mixing.jpg',
    imageAlt: 'Custom paint mixing station'
  },
  'hardware-installation': {
    tag: 'Hardware Advisory',
    title: 'Hardware Selection & Installation Support',
    desc: 'Specialist guidance on choosing fittings, handles, hinges, and accessories.',
    image: 'assets/images/service_hardware_selection.jpg',
    imageAlt: 'Premium hardware display'
  },
  'electrical-plumbing': {
    tag: 'Supplies',
    title: 'Electrical & Plumbing Supplies',
    desc: 'A comprehensive range of electrical and plumbing products with expert guidance.',
    image: 'assets/images/service_electrical_plumbing.jpg',
    imageAlt: 'Electrical and plumbing supplies'
  },
  'bulk-contractor-supply': {
    tag: 'Trade',
    title: 'Bulk & Contractor Supply',
    desc: 'Project-quantity sourcing and trade counter support for contractors and builders.',
    image: 'assets/images/service_bulk_contractor.jpg',
    imageAlt: 'Bulk contractor supply warehouse'
  },
  'delivery': {
    tag: 'Delivery',
    title: 'Home Delivery & Order Assistance',
    desc: 'Convenient delivery and order support for hardware and building supplies.',
    image: 'assets/images/service_delivery.jpg',
    imageAlt: 'Delivery service'
  }
};

/* ==========================================================================
   VALID SERVICE IDs
   ========================================================================== */
const VALID_IDS = Object.keys(SERVICES);

const SERVICE_ALIASES = {
  'hardware-selection': 'hardware-installation',
  'hardware_selection': 'hardware-installation',
  'hardware_installation': 'hardware-installation',
  'paint_consultation': 'paint-consultation',
  'paint_mixing': 'paint-mixing',
  'color-mixing': 'paint-mixing',
  'colour-mixing': 'paint-mixing',
  'electrical_plumbing': 'electrical-plumbing',
  'electrical-and-plumbing': 'electrical-plumbing',
  'bulk_contractor_supply': 'bulk-contractor-supply',
  'bulk-contractor': 'bulk-contractor-supply',
  'contractor-supply': 'bulk-contractor-supply',
  'home-delivery': 'delivery',
  'delivery-assistance': 'delivery',
  'home_delivery': 'delivery'
};

function getServiceId() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('service');
  if (!raw) return null;
  // Validate against known IDs — never use raw param directly in DOM
  let sanitised = raw.trim().toLowerCase();
  if (SERVICE_ALIASES[sanitised]) {
    sanitised = SERVICE_ALIASES[sanitised];
  }
  return VALID_IDS.includes(sanitised) ? sanitised : null;
}

/* ==========================================================================
   DOM RENDERING UTILITIES
   ========================================================================== */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value);
}

function createEl(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

/* ==========================================================================
   RENDER FUNCTIONS
   ========================================================================== */

/** Section A: Hero */
function renderHero(service) {
  setText('sd-breadcrumb-current', service.title);
  setText('sd-hero-eyebrow', service.eyebrow);
  setText('sd-hero-title', service.title);
  setText('sd-hero-desc', service.shortDesc);
  setText('sd-badge-text', service.badgeText);
  setText('sd-floating-title', `${service.title} Desk`);
  setText('sd-floating-desc', `1-on-1 technical advisory • Blueprint audits & custom formulations`);

  const img = document.getElementById('sd-hero-img');
  if (img) {
    img.src = service.image;
    img.alt = service.imageAlt;
  }

  document.title = service.pageTitle;
}

/** Section B: Detail Body */
function renderDetailBody(service) {
  const bodyEl = document.getElementById('sd-detail-body');
  if (!bodyEl) return;
  bodyEl.innerHTML = '';

  service.bodyContent.forEach((section, idx) => {
    // Haute Editorial Specification Card
    const card = createEl('div', 'sd-editorial-card');

    // Header with status eyebrow & protocol badge
    const header = createEl('div', 'sd-editorial-header');
    
    const eyebrowWrap = createEl('div', 'sd-editorial-eyebrow-wrap');
    const badgeDot = createEl('span', 'badge-pulsing-dot');
    const subtitle = createEl('span', 'sd-body-subtitle', section.subtitle);
    eyebrowWrap.appendChild(badgeDot);
    eyebrowWrap.appendChild(subtitle);
    header.appendChild(eyebrowWrap);

    const protocolTag = createEl('span', 'sd-protocol-tag', idx === 0 ? 'CERTIFIED SCOPE' : 'PROCUREMENT PROTOCOL');
    header.appendChild(protocolTag);

    card.appendChild(header);

    // Card Heading
    const heading = createEl('h3', 'sd-editorial-heading', section.heading);
    card.appendChild(heading);

    // Editorial Prose
    const prose = createEl('div', 'sd-editorial-prose');
    section.paragraphs.forEach(para => {
      const p = createEl('p', null, para);
      prose.appendChild(p);
    });
    card.appendChild(prose);

    // Specification Capabilities Matrix
    if (section.list && section.list.length) {
      const specMatrix = createEl('div', 'sd-spec-matrix');
      const matrixHeader = createEl('div', 'sd-matrix-title');
      matrixHeader.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        <span>VERIFIED SERVICE CAPABILITIES &amp; SPECIFICATIONS</span>
      `;
      specMatrix.appendChild(matrixHeader);

      const grid = createEl('div', 'sd-spec-grid');
      section.list.forEach(item => {
        const pill = createEl('div', 'sd-spec-pill');
        pill.innerHTML = `
          <div class="sd-spec-pill-badge" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="sd-spec-pill-text">${item}</span>
        `;
        grid.appendChild(pill);
      });
      specMatrix.appendChild(grid);
      card.appendChild(specMatrix);
    }

    // Architectural Advisory Callout Box for secondary section
    if (idx > 0) {
      const callout = createEl('div', 'sd-advisory-callout');
      callout.innerHTML = `
        <div class="sd-callout-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
        </div>
        <div class="sd-callout-body">
          <div class="sd-callout-title">Blueprint &amp; Trade Quantity Audit Available</div>
          <p class="sd-callout-desc">Bring your architectural drawings, door schedules, or paint specs into our showroom or submit them digitally. Our certified trade desk will complete a comprehensive itemized takeoff within 2 business hours.</p>
        </div>
      `;
      card.appendChild(callout);
    }

    bodyEl.appendChild(card);
  });
}

/** Section B: Feature List */
function renderFeatureList(service) {
  const listEl = document.getElementById('sd-feature-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  service.features.forEach(feat => {
    const li = createEl('li', 'sd-feature-item');
    li.innerHTML = `
      <span class="sd-feat-check-wrap" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span class="sd-feat-text">${feat}</span>
    `;
    listEl.appendChild(li);
  });
}

/** Section C: Benefits */
function renderBenefits(service) {
  const grid = document.getElementById('sd-benefits-grid');
  if (!grid) return;
  grid.innerHTML = '';

  service.benefits.forEach((benefit, i) => {
    const card = createEl('div', 'sd-benefit-card');

    // Watermark numeral
    const watermark = createEl('span', 'sd-benefit-watermark', `0${i + 1}`);
    card.appendChild(watermark);

    const iconWrap = createEl('div', 'sd-benefit-icon');
    iconWrap.innerHTML = benefit.icon; // SVG icons are hardcoded in SERVICES data
    card.appendChild(iconWrap);

    const title = createEl('div', 'sd-benefit-title', benefit.title);
    card.appendChild(title);

    const desc = createEl('p', 'sd-benefit-desc', benefit.desc);
    card.appendChild(desc);

    grid.appendChild(card);
  });
}

/** Section D: How It Works Steps */
const STEP_PHASES = [
  'PHASE 01 // AUDIT & INTAKE',
  'PHASE 02 // LAB FORMULATION',
  'PHASE 03 // DISPATCH & CERTIFY'
];

function renderSteps(service) {
  const row = document.getElementById('sd-steps-row');
  if (!row) return;
  row.innerHTML = '';

  service.steps.forEach((step, i) => {
    const stepEl = createEl('div', 'sd-step');

    const numWrap = createEl('div', 'sd-step-num-wrap');
    const num = createEl('div', 'sd-step-num', step.num);
    numWrap.appendChild(num);
    stepEl.appendChild(numWrap);

    const content = createEl('div', 'sd-step-content');
    const phase = createEl('span', 'sd-step-phase', STEP_PHASES[i] || `PHASE 0${i + 1}`);
    const title = createEl('div', 'sd-step-title', step.title);
    const desc = createEl('p', 'sd-step-desc', step.desc);
    content.appendChild(phase);
    content.appendChild(title);
    content.appendChild(desc);
    stepEl.appendChild(content);

    row.appendChild(stepEl);
  });
}

/** Section E: Related Services */
function renderRelated(service) {
  const grid = document.getElementById('sd-related-grid');
  if (!grid) return;
  grid.innerHTML = '';

  service.related.forEach(relId => {
    const meta = RELATED_META[relId];
    if (!meta) return;

    const card = document.createElement('a');
    card.className = 'sd-related-card';
    card.href = `Services Details.html?service=${encodeURIComponent(relId)}`;

    // Media
    const media = createEl('div', 'sd-related-media');
    const img = document.createElement('img');
    img.className = 'sd-related-img';
    img.src = meta.image;
    img.alt = meta.imageAlt;
    img.loading = 'lazy';
    media.appendChild(img);
    card.appendChild(media);

    // Body
    const body = createEl('div', 'sd-related-body');

    const tag = createEl('span', 'sd-related-tag', meta.tag);
    body.appendChild(tag);

    const title = createEl('div', 'sd-related-title', meta.title);
    body.appendChild(title);

    const desc = createEl('p', 'sd-related-desc', meta.desc);
    body.appendChild(desc);

    const link = createEl('span', 'sd-related-link', 'View Details →');
    body.appendChild(link);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

/** Section F: FAQ Accordion */
function renderFAQs(service) {
  const wrap = document.getElementById('sd-faq-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  service.faqs.forEach((faq, i) => {
    const item = createEl('div', 'sd-faq-item');
    item.setAttribute('role', 'listitem');

    const triggerId = `faq-trigger-${i}`;
    const panelId = `faq-panel-${i}`;

    // Trigger Button
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'sd-faq-trigger';
    trigger.id = triggerId;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', panelId);

    const triggerText = createEl('span', null, faq.q);
    trigger.appendChild(triggerText);

    // Icon
    const icon = createEl('span', 'sd-faq-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    trigger.appendChild(icon);

    // Panel
    const panel = createEl('div', 'sd-faq-panel');
    panel.id = panelId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', triggerId);
    panel.setAttribute('hidden', '');

    const body = createEl('div', 'sd-faq-body', faq.a);
    panel.appendChild(body);

    // Toggle interaction
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others first
      wrap.querySelectorAll('.sd-faq-item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.sd-faq-trigger').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.sd-faq-panel').removeAttribute('hidden');
        // Re-hide via class removal (CSS handles max-height)
        openItem.querySelector('.sd-faq-panel').setAttribute('hidden', '');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });

    item.appendChild(trigger);
    item.appendChild(panel);
    wrap.appendChild(item);
  });
}

/** Section G: CTA */
function renderCTA(service) {
  const titleEl = document.getElementById('sd-cta-title');
  if (titleEl) {
    titleEl.innerHTML = `Commission In-Store Advisory &amp; <span class="highlight-gold">${service.title}</span>`;
  }
  const descEl = document.getElementById('sd-cta-desc');
  if (descEl) {
    descEl.textContent = `Dedicated specification desk for architects, interior designers, and luxury builders. Receive rapid blueprint audits, custom patina & pigment matching, and complimentary hand-curated sample chests couriered in 24 hours.`;
  }
}

/* ==========================================================================
   NOT FOUND STATE
   ========================================================================== */
function showNotFound() {
  window.location.replace('Services.html');
}

/* ==========================================================================
   MAIN INITIALISATION
   ========================================================================== */
function initServiceDetails() {
  const serviceId = getServiceId();

  if (!serviceId) {
    showNotFound();
    return;
  }

  const service = SERVICES[serviceId];
  if (!service) {
    showNotFound();
    return;
  }

  // Render all sections
  renderHero(service);
  renderDetailBody(service);
  renderFeatureList(service);
  renderBenefits(service);
  renderSteps(service);
  renderRelated(service);
  renderFAQs(service);
  renderCTA(service);
}

/* ==========================================================================
   SITE-WIDE UTILITIES (mirrors index.js for consistency)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('forgelux-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('forgelux-theme', theme);
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggle.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function initRTL() {
  const rtlToggle = document.getElementById('rtlToggle');
  const html = document.documentElement;
  const savedDir = localStorage.getItem('forgelux-dir') || 'ltr';
  html.setAttribute('dir', savedDir);
  if (rtlToggle) {
    const span = rtlToggle.querySelector('.rtl-indicator');
    if (span) span.textContent = savedDir === 'rtl' ? 'LTR' : 'RTL';
    rtlToggle.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      html.setAttribute('dir', next);
      localStorage.setItem('forgelux-dir', next);
      if (span) span.textContent = next === 'rtl' ? 'LTR' : 'RTL';
    });
  }
}

function initDropdown() {
  const toggle = document.getElementById('homeDropdownToggle');
  const menu = document.getElementById('homeDropdownMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });
  toggle.addEventListener('keydown', e => { if (e.key === 'Escape') { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }});
  document.addEventListener('click', e => { if (!toggle.contains(e.target) && !menu.contains(e.target)) { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }});
}

function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');
  if (!toggle || !drawer || !backdrop) return;

  function openDrawer() { drawer.classList.add('is-open'); backdrop.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; closeBtn && closeBtn.focus(); }
  function closeDrawer() { drawer.classList.remove('is-open'); backdrop.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; toggle.focus(); }

  toggle.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   DOM READY — Bootstrap Everything
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initDropdown();
  initMobileNav();
  initStickyHeader();
  initServiceDetails();
  initQuoteModal();
});

/* ==========================================================================
   Quote Modal & Live Estimator (mirrors index.js)
   ========================================================================== */
function initQuoteModal() {
  const modalBackdrop = document.getElementById('quoteModalBackdrop');
  const modalClose = document.getElementById('quoteModalClose');
  const openButtons = document.querySelectorAll('.open-quote-modal');
  const quoteForm = document.getElementById('quoteForm');
  const quoteEstValue = document.getElementById('quoteEstimatedValue');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstInput = modalBackdrop.querySelector('input, select');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  function updateEstimate() {
    if (!quoteEstValue) return;
    const catSelect = document.getElementById('quoteCategory');
    const sqftInput = document.getElementById('quoteQuantity');
    const tierSelect = document.getElementById('quoteGrade');

    const cat = catSelect ? catSelect.value : 'hardware';
    const qty = sqftInput && Number(sqftInput.value) > 0 ? Number(sqftInput.value) : 100;
    const gradeMult = tierSelect && tierSelect.value === 'trade' ? 0.85 : (tierSelect && tierSelect.value === 'architectural' ? 1.4 : 1.0);

    let baseRate = 18;
    if (cat === 'paint') baseRate = 24;
    if (cat === 'tools') baseRate = 65;
    if (cat === 'bulk') baseRate = 12;

    const total = Math.round(qty * baseRate * gradeMult);
    quoteEstValue.textContent = `$${total.toLocaleString()}`;
  }

  ['quoteCategory', 'quoteQuantity', 'quoteGrade'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateEstimate);
      el.addEventListener('change', updateEstimate);
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Quotation request submitted! Our architectural specialist will contact you shortly.');
      quoteForm.reset();
      updateEstimate();
    });
  }
}

function showToast(message) {
  const existing = document.querySelector('.toast-notify');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notify';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--c-primary); flex-shrink: 0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('is-visible'), 10);
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

