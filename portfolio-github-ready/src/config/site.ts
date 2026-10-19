export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  availability: {
    status: "available" | "limited" | "unavailable";
    label: string;
  };
  contact: {
    email: string;
    location: string;
    inquiries: string;
  };
  socials: {
    linkedin?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  hero: {
    greeting: string;
    headline: string;
    highlightedWords: string[];
    subheadline: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  about: {
    fullName: string;
    professionalTitle: string;
    introduction: string[];
    story: string[];
    education: {
      degree: string;
      field: string;
      institution?: string;
      year?: string;
    }[];
    experience: {
      role: string;
      organization: string;
      bullets: string[];
    }[];
    specializations: string[];
    creativePhilosophy: {
      quote: string;
      paragraphs: string[];
    };
    achievements: string[];
    currentFocus: string[];
    futureGoals: string[];
    personalInterests: string[];
  };
  skills: {
    category: string;
    iconName?: string;
    items: string[];
  }[];
  resumeUrl?: string;
}

// Clean helper: filters out empty values or unedited placeholder strings containing "["
export function isPlaceholder(val?: string): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed === "" || (trimmed.startsWith("[") && trimmed.endsWith("]"));
}

export function cleanValue(val?: string, fallback: string = ""): string {
  return isPlaceholder(val) ? fallback : val!.trim();
}

export const siteConfig: SiteConfig = {
  name: "Veerepalli Shanmukh",
  shortName: "Shanmukh",
  title: "Veerepalli Shanmukh | AI Filmmaker & Creative Technologist",
  tagline: "AI Filmmaker | Creative Technologist | AI Video Creator | Software Developer",
  description:
    "Portfolio of Veerepalli Shanmukh — AI filmmaker, creative technologist, and software developer building cinematic AI films, commercial advertisements, visual effects, and intelligent digital experiences.",
  location: "Hyderabad, Telangana, India",
  availability: {
    status: "available",
    label: "Available for Collaborations & Creative Projects",
  },
  contact: {
    email: "shanmukh.creativestudio@gmail.com", // Replace with your public email or leave empty
    location: "Hyderabad, Telangana, India",
    inquiries:
      "Available for relevant AI filmmaking collaborations, creative projects, AI video production, and software development opportunities.",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/veerepalli-shanmukh", // Replace with your LinkedIn URL
    github: "https://github.com/shanmukh-ai", // Replace with your GitHub URL
    youtube: "https://youtube.com/@shanmukh-ai-films", // Replace with your YouTube channel
    instagram: "https://instagram.com/shanmukh.ai", // Replace with your Instagram URL
  },
  navigation: [
    { label: "Home", href: "/#" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    greeting: "Hello, I'm Veerepalli Shanmukh",
    headline: "Transforming Ideas into Cinematic AI Worlds & Intelligent Code",
    highlightedWords: ["Cinematic AI Worlds", "Intelligent Code"],
    subheadline:
      "AI Filmmaker, Creative Technologist, and Software Developer specializing in generative cinema, commercial AI production, visual effects, and modern interactive applications.",
    primaryCta: {
      label: "Explore My Work",
      href: "#work",
    },
    secondaryCta: {
      label: "About Me",
      href: "/about",
    },
  },
  about: {
    fullName: "Veerepalli Shanmukh",
    professionalTitle: "AI Filmmaker | Creative Technologist | AI Video Creator | Software Developer",
    introduction: [
      "I am Veerepalli Shanmukh, an AI filmmaker and creative technologist passionate about combining artificial intelligence, cinematic storytelling, visual effects, and software development to create innovative digital experiences.",
      "My work focuses on transforming creative ideas into compelling visual content using generative AI tools, AI-powered filmmaking workflows, character design, animation, cinematic commercials, and AI-generated advertisements. I explore the intersection of creativity and technology to develop visually engaging content for brands, businesses, and digital platforms.",
      "Alongside my creative work, I have a background in Artificial Intelligence and software development, with interests in machine learning, automation, web development, and intelligent applications. I enjoy experimenting with emerging technologies and building practical workflows that make creative production more efficient, accessible, and impactful.",
      "Through my creative projects, educational sessions, and technical experiments, I aim to push the boundaries of what individuals and businesses can achieve with AI.",
    ],
    story: [
      "My journey began with a strong interest in artificial intelligence, programming, and the possibilities of technology. While exploring AI and software development, I became increasingly interested in how these technologies could be used beyond traditional applications, particularly in filmmaking, animation, advertising, and visual storytelling.",
      "This interest led me to experiment with generative AI tools, AI character creation, cinematic scene generation, AI-generated voiceovers, visual effects, and commercial video production. I began exploring ways to combine different AI tools into creative workflows capable of turning an idea into a complete visual experience.",
      "Over time, my interests expanded into AI influencer videos, product advertisements, real estate commercials, cinematic storytelling, and educational content about AI-powered creative production.",
      "I also developed an interest in sharing my knowledge through AI filmmaking and creative technology sessions, helping others understand how modern AI tools can be used in practical creative projects.",
      "Today, I continue to explore the relationship between AI, creativity, and technology, building projects that combine technical experimentation with visual storytelling.",
    ],
    education: [
      {
        degree: "Bachelor of Technology (B.Tech)",
        field: "Artificial Intelligence",
        institution: "Engineering Technology Academy",
        year: "2022 - 2026",
      },
    ],
    experience: [
      {
        role: "AI Filmmaking & Creative Production",
        organization: "Independent Creative Projects | Shanmukh AI Film Makers",
        bullets: [
          "Develop AI-generated cinematic videos, advertisements, and creative visual content.",
          "Experiment with AI-powered character creation, animation, lip-sync, and video generation.",
          "Create concepts and production workflows for product commercials, food advertisements, and real estate promotional videos.",
          "Explore AI-assisted storytelling, scene composition, visual consistency, and cinematic direction.",
          "Combine generative AI tools to develop creative content for digital platforms and brands.",
        ],
      },
      {
        role: "AI Education & Creative Technology Training",
        organization: "AI Filmmaking and Creative Workflow Sessions",
        bullets: [
          "Teach and demonstrate AI-powered creative workflows and emerging generative AI tools.",
          "Guide learners through AI video creation, character design, AI UGC, visual effects, and commercial production.",
          "Introduce AI tools and workflows for storytelling, branding, and digital content creation.",
          "Conduct practical sessions covering portfolio development, deployment, and creative technology workflows.",
        ],
      },
      {
        role: "Software Development & AI Projects",
        organization: "Academic and Independent Projects",
        bullets: [
          "Explore AI/ML applications, automation, computer vision, and intelligent software systems.",
          "Develop web applications, APIs, bots, and frontend experiences.",
          "Experiment with integrating generative AI services into software applications.",
          "Build practical projects that connect programming, automation, and creative problem-solving.",
        ],
      },
    ],
    specializations: [
      "AI Filmmaking and Generative Video",
      "AI-Powered Commercial Production",
      "Creative Direction and Visual Storytelling",
      "AI Influencer and UGC Video Creation",
      "AI Character Design and Animation",
      "AI-Assisted Visual Effects (VFX)",
      "Cinematic Advertising and Brand Content",
      "AI Music, Voiceovers, and Lip-Sync Workflows",
      "Creative Technology and Generative AI",
      "Artificial Intelligence and Machine Learning",
      "Software Development and Automation",
      "Web Development and Interactive Digital Experiences",
    ],
    creativePhilosophy: {
      quote:
        "The future of creativity lies in the collaboration between human imagination and artificial intelligence.",
      paragraphs: [
        "Technology provides powerful tools, but creativity, storytelling, visual judgment, and a clear understanding of the audience are what make the final result meaningful. My approach is to begin with a strong idea, develop a clear visual direction, select the right tools, and refine the production workflow until the output aligns with the intended vision.",
        "I value experimentation, continuous learning, and practical problem-solving. Whether I am creating a cinematic AI video, developing an intelligent application, or teaching a creative workflow, my goal is to combine innovation with purpose.",
        "For me, AI is not simply about generating content faster. It is about expanding creative possibilities and making ideas that once seemed difficult to produce more achievable.",
      ],
    },
    achievements: [
      "Developed independent AI filmmaking and generative AI creative projects.",
      "Created AI commercial concepts for food, product, and real estate advertising.",
      "Conducted educational sessions on AI filmmaking, generative AI tools, and creative workflows.",
      "Explored software development projects involving AI, automation, and web technologies.",
    ],
    currentFocus: [
      "Creating realistic, cinematic AI advertisements and brand commercials.",
      "Improving character consistency, animation quality, and AI video production workflows.",
      "Developing a professional portfolio to showcase my creative and technical projects.",
      "Exploring advanced AI tools, model capabilities, and reusable creative workflows.",
      "Building interactive web experiences using Next.js and modern frontend technologies.",
      "Sharing practical knowledge through AI filmmaking education and creative technology sessions.",
    ],
    futureGoals: [
      "Establish myself as a creative technologist and AI filmmaker who bridges the gap between advanced technology and professional visual storytelling.",
      "Build a strong portfolio of high-quality creative work and collaborate with forward-thinking brands and businesses.",
      "Develop innovative AI-powered production workflows and contribute to the growing field of AI filmmaking.",
      "Expand educational initiatives to help more creators adopt AI effectively.",
      "Explore opportunities to build products and businesses at the intersection of artificial intelligence, filmmaking, and software development.",
    ],
    personalInterests: [
      "Artificial Intelligence and emerging technologies",
      "AI filmmaking and cinematic storytelling",
      "Animation, VFX, and visual experimentation",
      "Product advertising and creative direction",
      "Software development and automation",
      "Web design and interactive experiences",
      "Learning new AI tools and creative workflows",
      "Teaching, mentoring, and sharing technical knowledge",
      "Building innovative digital products and projects",
    ],
  },
  skills: [
    {
      category: "AI Filmmaking & Creative Tools",
      items: [
        "Google Flow",
        "OpenArt",
        "LemonPeel",
        "ElevenLabs",
        "Google Gemini",
        "Hugging Face",
        "AI Video Generation",
        "AI Character Consistency",
        "Lip-Sync & Voice Synthesis",
        "AI UGC & Commercials",
      ],
    },
    {
      category: "AI & Machine Learning",
      items: [
        "Generative AI Workflows",
        "Google Gemini API",
        "Machine Learning Fundamentals",
        "Computer Vision",
        "AI-Assisted Automation",
        "Prompt Engineering",
        "OCR & Tesseract",
      ],
    },
    {
      category: "Programming & Software",
      items: [
        "Python",
        "JavaScript (ES6+)",
        "TypeScript",
        "Node.js & Express",
        "REST APIs & Integration",
        "SQL & Databases",
        "Git & GitHub",
        "Automation Scripting",
      ],
    },
    {
      category: "Frontend & Creative Web",
      items: [
        "Next.js (App Router)",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js & WebGL",
        "Responsive Architecture",
        "Interactive UI Design",
      ],
    },
    {
      category: "Creative Direction & VFX",
      items: [
        "Cinematic Storyboarding",
        "Visual Effects (VFX)",
        "Commercial Production",
        "Color Grading & Direction",
        "Sound & Audio Design",
      ],
    },
  ],
  resumeUrl: "/documents/resume.pdf",
};
