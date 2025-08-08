'use client'
import { fetchUsers } from '@/actions/search.actions'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { SEARCH_DEBOUNCE_DELAY } from '@/constants/timings'
import { GitHubUserResponse } from '@/types/githubResponse'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const Autocomplete = () => {
  const [open, setOpen] = useState(false)
  const [profileList, setProfileList] = useState<GitHubUserResponse[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setProfileList([])
        return
      }
      try {
        const response = await fetchUsers(searchTerm)
        if ('items' in response && Array.isArray(response.items)) {
          setProfileList(response.items)
        } else {
          setProfileList([])
        }
      } catch {
        setProfileList([])
      }
    }, SEARCH_DEBOUNCE_DELAY)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  return (
    <div className="relative w-full max-w-md">
      <Command className="overflow-visible h-auto border">
        <CommandInput
          placeholder="Search"
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
          onValueChange={setSearchTerm}
        />

        {open && (
          <div className="absolute top-full left-0 w-full z-50 rounded-md border">
            <CommandList className="max-h-60 overflow-auto bg-black rounded-md ">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {profileList.map((profile) => (
                  <CommandItem
                    key={profile.id}
                    onSelect={() => {
                      router.push(`/${profile.login}`)
                    }}
                    onMouseDown={() => {
                      router.push(`/${profile.login}`)
                    }}
                  >
                    {profile.login}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  )
}

export { Autocomplete }
