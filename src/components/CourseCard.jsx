import { Clock3, GraduationCap } from 'lucide-react'
import Button from './Button.jsx'

export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <GraduationCap size={22} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
          <p className="text-sm text-slate-600">{course.provider}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600">{course.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
          <Clock3 size={16} /> {course.duration}
        </span>
        <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">{course.level}</span>
      </div>

      <div className="mt-5">
        <Button className="w-full" variant="primary">
          Enroll
        </Button>
      </div>
    </div>
  )
}
