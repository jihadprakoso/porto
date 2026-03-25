import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function SupabaseTestPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
      {error ? (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
          Error: {error.message}
        </div>
      ) : (
        <ul className="space-y-2">
          {todos?.length === 0 && <p className="text-gray-500">No data in "todos" table. Database connected!</p>}
          {todos?.map((todo: any) => (
            <li key={todo.id} className="p-2 bg-white/5 rounded">
              {todo.name || todo.title || JSON.stringify(todo)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
