export type WeekOverview = {
  week: number
  label: string
  title: string
  status: 'Active' | 'Preview'
  description: string
  outcome: string
  video: {
    title: string
    description: string
    duration: string
  }
  lessons: Record<string, string>
  quiz?: {
    title: string
    description: string
  }
  project: {
    title: string
    description: string
  }
}

export const WEEK_OVERVIEWS: Record<number, WeekOverview> = {
  1: {
    week: 1,
    label: 'Week 1',
    title: 'AI Foundations',
    status: 'Active',
    description:
      'Understand what AI is, where it is used, and how to think clearly with AI tools before building larger projects.',
    outcome:
      'You will leave this week with the vocabulary and mental models needed to use AI without getting lost in hype.',
    video: {
      title: 'Week 1 Video Lesson',
      description:
        'A guided walkthrough of AI foundations, how AI learns, and how to think critically while using AI tools.',
      duration: '12 min',
    },
    lessons: {
      'what-is-ai': 'Build the basic vocabulary for AI, machine learning, and deep learning.',
      'how-ai-learns': 'See how AI learns patterns from examples and why data quality matters.',
      'ai-vs-human-thinking':
        'Understand the difference between human understanding and AI prediction.',
    },
    quiz: {
      title: 'Week 1 Self-Check',
      description: 'Review the core ideas before moving into the project.',
    },
    project: {
      title: 'Build Your First AI Study Assistant',
      description:
        'Create a reusable assistant prompt that explains topics, quizzes you, corrects mistakes, and plans your next study step.',
    },
  },
  2: {
    week: 2,
    label: 'Week 2',
    title: 'Prompt Engineering Basics',
    status: 'Active',
    description:
      'Learn how to talk to AI clearly, give better instructions, and avoid common prompting mistakes.',
    outcome:
      'You will be able to turn vague requests into structured prompts with role, context, task, constraints, and format.',
    video: {
      title: 'Week 2 Video Lesson',
      description:
        'A practical walkthrough of how prompts work, how to structure instructions, and how to improve weak prompts.',
      duration: '15 min',
    },
    lessons: {
      'what-is-prompting':
        'Understand what prompts are and why clear instructions change AI output quality.',
      'how-to-give-better-instructions':
        'Learn how role, context, task, and quality rules make prompts more useful.',
      'common-prompting-mistakes':
        'Spot vague prompts, missing context, overloaded requests, and weak follow-up habits.',
    },
    quiz: {
      title: 'Week 2 Self-Check',
      description: 'Review the prompting basics before building your prompt pack.',
    },
    project: {
      title: 'Build Your First Prompt Pack',
      description: 'Create a small reusable prompt pack for one real-life use case.',
    },
  },
  3: {
    week: 3,
    label: 'Week 3',
    title: 'AI Tools & Workflows',
    status: 'Active',
    description:
      'Choose the right AI tools, combine them into simple workflows, and turn AI output into useful real-world results.',
    outcome:
      'You will understand how to move from one-off prompting to repeatable workflows you can reuse.',
    video: {
      title: 'Week 3 Video Lesson',
      description:
        'A practical walkthrough of how to use AI tools together for research, writing, planning, and content creation.',
      duration: '18 min',
    },
    lessons: {
      'choosing-the-right-ai-tool':
        'Learn how to match AI tools to the kind of work you actually need to do.',
      'building-simple-ai-workflows':
        'Understand how to combine research, structure, drafting, and review into a repeatable flow.',
      'turning-ai-output-into-real-work':
        'Practice turning rough AI output into something useful, specific, and human-reviewed.',
    },
    quiz: {
      title: 'Week 3 Self-Check',
      description: 'Review tool selection and workflow basics before building your content workflow.',
    },
    project: {
      title: 'Build Your First AI Content Workflow',
      description: 'Turn one idea into a useful content draft with a simple repeatable AI workflow.',
    },
  },
  4: {
    week: 4,
    label: 'Week 4 Preview',
    title: 'Building With AI',
    status: 'Preview',
    description:
      'Preview how to turn an idea into a simple AI-powered product concept and define the first useful version.',
    outcome:
      'The project is available now; lessons and self-check content will arrive when this module opens fully.',
    video: {
      title: 'Week 4 Video Lesson',
      description:
        'A practical walkthrough of how to think like an AI product builder and shape an idea into a simple product plan.',
      duration: '20 min',
    },
    lessons: {
      'finding-a-problem-worth-solving':
        'Learn how to spot real user problems before jumping into AI features.',
      'designing-an-ai-feature':
        'Understand what the user gives the AI, what the AI returns, and why it helps.',
      'planning-a-simple-ai-product':
        'Shape a small product idea into a clear first version that could actually be built.',
    },
    project: {
      title: 'Build Your First AI Mini Product Plan',
      description: 'Create a simple AI product plan for one real user problem.',
    },
  },
  5: {
    week: 5,
    label: 'Week 5 Preview',
    title: 'Final AI Project',
    status: 'Preview',
    description:
      'Preview the final portfolio project where you combine the course into one clear AI-powered project case study.',
    outcome:
      'The final project is available now; lessons and reflection content will arrive when this module opens fully.',
    video: {
      title: 'Week 5 Video Lesson',
      description:
        'A final walkthrough on turning your AI skills into a clear project presentation and portfolio-ready case study.',
      duration: '22 min',
    },
    lessons: {
      'choosing-your-final-project':
        'Choose a focused project that shows what you learned without becoming too broad.',
      'building-the-project-story':
        'Turn your process into a clear story about the problem, workflow, output, and result.',
      'presenting-your-ai-work':
        'Learn how to explain your AI project in a way that feels useful and credible.',
    },
    project: {
      title: 'Create Your Final AI Portfolio Project',
      description: 'Build a portfolio-ready case study that explains your AI project and process.',
    },
  },
}

export function getWeekOverview(week: number) {
  return WEEK_OVERVIEWS[week]
}
