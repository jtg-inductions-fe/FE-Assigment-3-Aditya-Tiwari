"use client";
import { fetchUsers } from "@/actions/search.actions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { GitHubUserResponse } from "@/types/githubResponse";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Autocomplete = () => {
  const [open, setOpen] = useState(false);
  const [profileList, setProfileList] = useState<GitHubUserResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        if (Array.isArray(response)) {
          setProfileList(response);
        }
      } catch {
        setProfileList([]);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <Command className="overflow-visible h-auto border">
        <CommandInput
          placeholder="Search"
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
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
                      router.push(`/${profile.login}`);
                    }}
                    onMouseDown={() => {
                      router.push(`/${profile.login}`);
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
  );
};

export { Autocomplete };
