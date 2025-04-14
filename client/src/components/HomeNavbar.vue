<script setup lang="ts">
import { LogOut, Settings } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
import DropdownMenu from "./ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "./ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "./ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuLabel from "./ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "./ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "./ui/dropdown-menu/DropdownMenuTrigger.vue";

interface User {
  name?: string;
  email?: string;
  image?: string;
}

const props = defineProps<{
  user: User | null; // Explicitly include null in the type
}>();

console.log(props.user);
</script>

<template>
  <nav
    class="w-full bg-[black] text-[hsl(var(--sidebar-primary))] border-b border-[hsl(var(--sidebar-border))] dark"
  >
    <div
      class="container flex justify-between items-center mx-auto px-6 md:px-10"
    >
      <div class="flex items-center justify-between h-20">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-3">
          <img src="/smile.svg" alt="" class="w-8" />
          <div class="flex-shrink-0">
            <a href="#" class="text-inherit font-semibold text-2xl">
              SlideS<span class="text-white">cribe</span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-full h-full rounded-full overflow-hidden">
              <img :src="user?.image" class="w-14" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-full rounded-full overflow-hidden">
                    <img :src="user?.image" class="w-14" />
                </div>
                <div className="font-bold">
                  <p
                    className="font-normal dark:text-slate-300 text-gray-600"
                  >{{ user?.name }}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a
                className="w-full flex items-center gap-3"
                href="/dashboard/settings"
              >
                <Settings className="ml-3 size-15" />
                Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form className="w-full cursor-pointer flex items-center gap-3">
                <Button className="flex w-full items-center gap-3">
                  <LogOut className="ml-3 size-15" />
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
