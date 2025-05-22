<script setup lang="ts">
import { LogOut, Settings, GithubIcon } from "lucide-vue-next";
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

const handleLogout = async () => {
  const res = await fetch("http://localhost:4000/api/auth/logout", {
    method: "GET",
    credentials: "include", // Important to include session cookie
  });
  console.log(res);
  window.location.href = "/";
};
</script>

<template>
  <nav
    class="w-full bg-slate-900 text-[hsl(var(--sidebar-primary))] rounded-br-xl border-[hsl(var(--sidebar-border))] dark"
  >
    <div
      class="container flex justify-between items-center mx-auto px-6 md:px-10"
    >
      <div class="flex items-center justify-between h-20">
        <div class="md:hidden bg-white">hi</div>
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
      <div class="flex justify-center gap-5 items-center">
        <div>
          <a
            target="_blank"
            href="https://github.com/SabarishSriram/SlideScribe"
          >
            <button
              class="text-white gap-2 flex items-center justify-center font-bold text-sm px-3 py-2 rounded-md bg-black"
            >
              <GithubIcon class="w-4" /> GitHub
            </button>
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-full h-full rounded-full overflow-hidden">
              <img :src="user?.image" class="w-11" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="bg-[#0F172A] border-[#472E30]">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-full rounded-full overflow-hidden">
                  <img
                    @error=""
                    :src="user?.image"
                    class="w-11"
                  />
                </div>
                <div className="font-bold">
                  <p className="font text-white text-sm">{{ user?.name }}</p>
                  <p className="font-normal text-white text-sm">
                    {{ user?.email }}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator class="bg-[#472E30]" />
            <DropdownMenuItem class="p-0 rounded-lg">
              <a
                href="/settings"
                class="w-full text-white flex items-center gap-3 py-2 hover:bg-[#FF4550] rounded-lg transition-colors"
              >
                <Settings :size="17" class="ml-3" />
                Settings
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem class="p-0 rounded-lg">
              <button
                class="w-full text-white flex items-center gap-3 py-2 hover:bg-[#FF4550] rounded-lg transition-colors"
                @click="handleLogout"
              >
                <LogOut :size="17" class="ml-3" />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
