import { defineType, defineField } from 'sanity'

export const techStack = defineType({
  name: 'techStack',
  title: 'Tech Stack & Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Title (e.g., Frontend Core)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (FiCode, FiLayers, FiCpu, FiDatabase, FiTool)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'coreSkills',
      title: 'Core Skills (주력 기술)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'experiencedSkills',
      title: 'Experienced Skills (사용 경험이 있는 기술)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
