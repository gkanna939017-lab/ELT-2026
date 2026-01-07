import CourseCard from '../components/CourseCard.jsx'
import { courses } from '../data/mockData.js'
import { BookOpen, BadgeCheck } from 'lucide-react'

export default function TrainingHub() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Training Hub</p>
        <h1 className="text-3xl font-bold text-slate-900">Upskill with curated vocational courses</h1>
        <p className="text-sm text-slate-600">
          Learn in-demand skills, earn certificates, and level up your career with trusted partners.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-primary-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1">
            <BookOpen size={16} /> Self-paced & instructor-led
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1">
            <BadgeCheck size={16} /> Certificates on completion
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
