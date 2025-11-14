import type { ImagePlaceholder } from './placeholder-images';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    dropdown: [
      { name: 'Software Development & Web/Mobile Apps', href: '/services/software-development' },
      { name: 'IT Outsourcing & Consulting', href: '/services/it-outsourcing' },
      { name: 'Cloud, DevOps & Microservices', href: '/services/cloud-devops-microservices' },
      { name: 'AI, Data Analytics & Automation', href: '/services/ai-data-analytics-automation' },
    ]
  },
  { name: 'Clients', href: '/clients' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    slug: 'software-development',
    title: 'Software Development & Web/Mobile Apps',
    description: 'From concept to launch, we offer end-to-end software development services. Our expertise spans web, mobile, and enterprise applications, ensuring robust, scalable, and high-performance solutions that drive business growth.',
    image: 'service-software-development',
    features: [
      { title: 'Custom Web Applications', description: 'Build responsive, modern web applications tailored to your business needs using latest frameworks and technologies.' },
      { title: 'Mobile App Development', description: 'Native and cross-platform mobile applications (iOS, Android) with seamless user experiences.' },
      { title: 'Agile Methodology', description: 'We follow agile principles to ensure iterative development, transparency, and faster delivery.' },
      { title: 'Quality Assurance', description: 'Rigorous testing at every stage to deliver bug-free, production-ready software.' },
    ],
  },
  {
    slug: 'it-outsourcing',
    title: 'IT Outsourcing & Consulting',
    description: 'Leverage our global talent pool to build and scale your engineering teams. We provide dedicated developers, QA engineers, and strategic consulting to augment your existing team or build a new one from scratch.',
    image: 'service-it-outsourcing',
    features: [
      { title: 'Dedicated Development Teams', description: 'Access to pre-vetted, highly skilled professionals across various technology stacks and domains.' },
      { title: 'Strategic Consulting', description: 'Expert guidance on technology strategy, architecture, and implementation for your business needs.' },
      { title: 'Cost-Effective Solutions', description: 'Reduce recruitment and operational costs significantly compared to local hiring.' },
      { title: 'Scalability & Flexibility', description: 'Quickly scale your team up or down based on project requirements without long-term commitments.' },
    ],
  },
  {
    slug: 'cloud-devops-microservices',
    title: 'Cloud, DevOps & Microservices',
    description: 'Transform your infrastructure with cloud-native solutions and modern DevOps practices. We architect, deploy, and manage scalable microservices platforms that enable rapid innovation and deployment.',
    image: 'service-cloud-devops',
    features: [
      { title: 'Cloud Migration', description: 'Seamless migration to AWS, Azure, or GCP with minimal downtime and maximum efficiency.' },
      { title: 'DevOps & CI/CD', description: 'Implement robust CI/CD pipelines and infrastructure automation for faster deployments.' },
      { title: 'Microservices Architecture', description: 'Design and implement scalable microservices architectures for modern applications.' },
      { title: 'Infrastructure as Code', description: 'Infrastructure management through code (Terraform, CloudFormation) for consistency and scalability.' },
    ],
  },
  {
    slug: 'ai-data-analytics-automation',
    title: 'AI, Data Analytics & Automation',
    description: 'Harness the power of artificial intelligence, machine learning, and data analytics to unlock actionable insights. We build intelligent systems and automate complex business processes for competitive advantage.',
    image: 'service-ai-data',
    features: [
      { title: 'Machine Learning Solutions', description: 'Custom ML models for predictive analytics, classification, and intelligent recommendations.' },
      { title: 'Data Analytics & BI', description: 'Transform raw data into actionable insights with advanced analytics and business intelligence tools.' },
      { title: 'Process Automation', description: 'Automate repetitive business processes using RPA and workflow automation technologies.' },
      { title: 'AI Integration', description: 'Integrate AI capabilities into existing applications for enhanced functionality and user experience.' },
    ],
  },
];

export const CLIENT_LOGOS: { name: string; image: ImagePlaceholder['id'] }[] = [
  { name: 'Anglerfox', image: 'client-anglerfox' },
  { name: 'Annular Technologies', image: 'client-annular-technologies' },
  { name: 'BranchX', image: 'client-branchx' },
  { name: 'Cateina', image: 'client-cateina' },
  { name: 'CodersBrain', image: 'client-codersbrain' },
  { name: 'Discreet', image: 'client-discreet' },
  { name: 'Enlign', image: 'client-enlign' },
  { name: 'JainFoway', image: 'client-jainfoway' },
  { name: 'MW', image: 'client-mw' },
  { name: 'Nihon Technology', image: 'client-nihon-technology' },
 
  { name: 'Oasys', image: 'client-oasys' },
  { name: 'Recro', image: 'client-recro' },
  { name: 'RevallSys', image: 'client-revalsys' },
  { name: 'Splenta', image: 'client-splenta' },
  { name: 'Step to Soft', image: 'client-step-to-soft' },
  { name: 'TailWebs', image: 'client-tailwebs' },
];

export const JOB_OPENINGS = [
  {
    title: 'Senior Frontend Engineer (Next.js)',
    location: 'Remote',
    description: 'We are looking for an experienced Frontend Engineer to lead the development of our client-facing applications using Next.js and TypeScript.'
  },
  {
    title: 'Investment Analyst',
    location: 'New York, NY',
    description: 'Join our venture capital team to identify, analyze, and support the next generation of technology startups.'
  },
  {
    title: 'Full-Stack Developer (Python/React)',
    location: 'Remote',
    description: 'Build and maintain our internal software solutions. Proficiency in Python (Django/Flask) and React is required.'
  }
];
