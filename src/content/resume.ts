// Single source of truth for everything on the portfolio and the /resume page.
// Content mirrors public/Divyangi_Kanchan_Resume.docx — keep the two in sync.

export const RESUME_FILE = '/Divyangi_Kanchan_Resume.docx'

export const profile = {
  name: 'Divyangi Kanchan',
  short: 'Divyangi',
  nickname: 'Divya',
  role: 'Full-Stack Developer',
  focus: ['React.js', 'Java / Spring Boot', 'Shopify'],
  location: 'Pune, India',
  phone: '+91 9011794207',
  email: 'divyangikk02@gmail.com',
  linkedin: 'https://linkedin.com/in/divyangi-kanchan-12dec2002',
  linkedinLabel: 'linkedin.com/in/divyangi-kanchan-12dec2002',
  github: 'https://github.com/divyangik',
  githubLabel: 'github.com/divyangik',
  summary:
    'Full-Stack Developer with hands-on experience building React.js interfaces, Shopify apps, and database-backed web applications, backed by Java, Spring Boot and MySQL training and academic projects. Comfortable with REST API integration, CRUD workflows, multilingual CMS customization, and testing across development, SIT and UAT environments.',
}

export const skillGroups = [
  {
    title: 'Frontend',
    emoji: '🎨',
    tint: 'bg-blush',
    items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Angular (academic)', 'Responsive design'],
  },
  {
    title: 'Backend',
    emoji: '⚙️',
    tint: 'bg-mint',
    items: ['Java', 'Spring Boot', 'PHP', 'Python', 'FastAPI', 'REST APIs', 'JSP', 'Auth & role-based access'],
  },
  {
    title: 'Database',
    emoji: '🗄️',
    tint: 'bg-butter',
    items: ['MySQL', 'SQL (joins, queries)', 'TiDB', 'Database transactions'],
  },
  {
    title: 'E-commerce & CMS',
    emoji: '🛍️',
    tint: 'bg-sky',
    items: ['Shopify Liquid', 'Shopify Admin APIs', 'Metafields', 'Joomla 6', 'WordPress', 'Elementor', 'Falang'],
  },
  {
    title: 'Tools',
    emoji: '🧰',
    tint: 'bg-lilac',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'cPanel', 'Functional testing', 'Debugging'],
  },
] as const

export const experience = [
  {
    role: 'Full-Stack Developer',
    company: 'eDreamz',
    companyNote: 'Shopify Partner Agency',
    location: 'Pune, India',
    period: 'Dec 2025 – Present',
    points: [
      'Build and customize Shopify storefronts and apps using React.js, JavaScript, Liquid, HTML and CSS; use Shopify Admin APIs and metafields to retrieve and manage product and application data.',
      'Develop reusable UI components and CRUD workflows for product, sales, location, sync, booking and enquiry modules, including search, filtering and form validation.',
      'Customize Joomla 6 modules and English/Arabic content, adding accessibility improvements such as ARIA landmarks, keyboard navigation and skip links.',
      'Maintain WordPress client sites (updates, backups, form checks); debug and test features with Postman and functional testing across development, SIT and UAT.',
    ],
  },
]

export type Project = {
  name: string
  stack: string[]
  points: string[]
  tint: string
  tag?: string
}

export const professionalProjects: Project[] = [
  {
    name: 'ITA Shopify Travel & Booking App',
    tag: 'Travel · Booking',
    stack: ['React / Remix', 'Shopify app', 'FastAPI', 'MySQL / TiDB', 'REST APIs'],
    points: [
      'Built package, tour, traveler, booking and enquiry workflows with database-backed features.',
      'Search and filtering, date validation and a responsive UI.',
    ],
    tint: 'bg-blush',
  },
  {
    name: 'CrowdLink Product, Sales & Sync Platform',
    tag: 'Commerce · Sync',
    stack: ['React.js', 'Shopify / Square APIs', 'Metafields'],
    points: [
      'Worked on product, sales, location and sync modules with API integrations and metafield-based data.',
      'Fixed product table and data-display issues; updated product handling to client requirements.',
    ],
    tint: 'bg-mint',
  },
  {
    name: 'Dubai Trade Service Centre CMS',
    tag: 'CMS · Bilingual',
    stack: ['Joomla 6', 'PHP', 'JavaScript', 'HTML/CSS', 'Helix Ultimate', 'SP Page Builder', 'Falang'],
    points: [
      'Implemented service-centre features and entity/persona filtering for English/Arabic content.',
      'Improved accessibility — keyboard navigation, ARIA landmarks, alt text.',
    ],
    tint: 'bg-sky',
  },
  {
    name: 'WordPress Client Websites',
    tag: 'Care · Maintenance',
    stack: ['WordPress', 'Elementor', 'PHP', 'cPanel'],
    points: [
      'Updated core and plugins, backed up sites and verified behaviour after updates.',
      'Tested contact and donation forms end to end.',
    ],
    tint: 'bg-butter',
  },
]

export const academicProjects: Project[] = [
  {
    name: 'Jainam Billing System',
    tag: 'Group project · Frontend',
    stack: ['React.js', 'MySQL'],
    points: ['React.js screens for billing and invoices, product details, cart interactions and pipe-booking workflows.'],
    tint: 'bg-butter',
  },
  {
    name: 'Plant Selling / Nursery Website',
    tag: 'Full-stack',
    stack: ['React.js', 'Spring Boot', 'MySQL'],
    points: ['Admin/User login, product browsing, cart and order flows, quantity tracking and validation — with a responsive, animated UI.'],
    tint: 'bg-mint',
  },
  {
    name: 'Travel Management Website',
    tag: 'Full-stack',
    stack: ['Angular', 'Spring Boot', 'MySQL', 'REST APIs'],
    points: ['Package and booking workflows with CRUD, REST integration, an admin dashboard and role-based access control.'],
    tint: 'bg-sky',
  },
  {
    name: 'Pet Shop Website',
    tag: 'Full-stack',
    stack: ['JSP', 'Spring Boot', 'MySQL'],
    points: ['Authentication, product management, cart and orders using MVC/DAO patterns and transaction handling.'],
    tint: 'bg-blush',
  },
]

export const education = [
  {
    title: 'B.Voc in Software Development',
    org: 'Savitribai Phule Pune University (SPPU)',
    detail: 'CGPA 8.9 / 10',
    period: '2021 – 2024',
    kind: 'Degree',
  },
  {
    title: 'Full Stack Java Developer Certification',
    org: 'Seed Infotech',
    detail: 'Java · Spring Boot · MySQL',
    period: '2025',
    kind: 'Certification',
  },
]

// The story beats used by the journey timeline.
export const timeline = [
  { year: '2021', title: 'The first line of code', text: 'Started a B.Voc in Software Development at SPPU — and fell for the moment a page finally does what you imagined.' },
  { year: '2022–23', title: 'Building in the practice room', text: 'Billing systems, a nursery shop, a travel portal, a pet store — React, Angular, JSP and Spring Boot, one project at a time.' },
  { year: '2024', title: 'Graduated with an 8.9 CGPA', text: 'Wrapped up the degree with a solid foundation in frontend, backend and databases.' },
  { year: '2025', title: 'Leveling up in Java', text: 'Earned the Full Stack Java Developer Certification from Seed Infotech.' },
  { year: 'Dec 2025', title: 'Shipping for real clients', text: 'Joined eDreamz, a Shopify Partner agency, building storefronts, apps and accessible CMS sites.' },
]

export const stats = [
  { value: 8.9, decimals: 1, suffix: '', label: 'CGPA at SPPU' },
  { value: 4, decimals: 0, suffix: '', label: 'Client projects shipped' },
  { value: 4, decimals: 0, suffix: '', label: 'Academic builds' },
  { value: 2, decimals: 0, suffix: '', label: 'Languages supported (EN/AR)' },
]
