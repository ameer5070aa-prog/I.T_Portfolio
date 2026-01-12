import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "master";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "hero",
        label: "Hero Section",
        path: "src/content",
        format: "json",
        match: {
          include: "hero",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            // Navigate to homepage for hero editing
            return '/';
          },
        },
        fields: [
          {
            type: "string",
            name: "statusBadge",
            label: "Status Badge",
            required: true,
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "skills",
            label: "Skills",
            required: true,
            list: true,
          },
        ],
      },
      {
        name: "about",
        label: "About Section",
        path: "src/content",
        format: "json",
        match: {
          include: "about",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            // Navigate to homepage for about section editing
            return '/';
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Section Title",
            required: true,
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            required: true,
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "value",
                label: "Value",
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "json",
        ui: {
          router: ({ document }) => {
            // Navigate to homepage for projects editing
            return '/';
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "covers",
            label: "What This Project Covers",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "skills",
            label: "Skills Demonstrated",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "importance",
            label: "Why It Matters",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
        ],
      },
      {
        name: "contact",
        label: "Contact Info",
        path: "src/content",
        format: "json",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            // Navigate to homepage for contact editing
            return '/';
          },
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true,
          },
          {
            type: "string",
            name: "linkedin",
            label: "LinkedIn URL",
          },
          {
            type: "string",
            name: "github",
            label: "GitHub URL",
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter/X URL",
          },
        ],
      },
      {
        name: "labs",
        label: "Labs Section",
        path: "src/content",
        format: "json",
        match: {
          include: "labs",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            return '/';
          },
        },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Lab Categories",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Category Title",
                required: true,
              },
              {
                type: "object",
                name: "labs",
                label: "Labs",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Lab Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "skills",
                    label: "Skills",
                    list: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "certifications",
        label: "Certifications Section",
        path: "src/content",
        format: "json",
        match: {
          include: "certifications",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            return '/';
          },
        },
        fields: [
          {
            type: "object",
            name: "certifications",
            label: "Certifications",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Certification Name",
                required: true,
              },
              {
                type: "string",
                name: "status",
                label: "Status",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "details",
                label: "Details",
              },
              {
                type: "string",
                name: "url",
                label: "Certificate URL",
              },
              {
                type: "string",
                name: "studyFocus",
                label: "Study Focus Areas",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
