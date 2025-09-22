<script lang="ts" setup>
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBase;
const consultServiceUrl = config.public.consultService;

const iconDirection = ref<string>(iconDirections.down);
const avatarSrcs = ref<string[]>([]);
const isExpanded = ref<boolean>(false);
const loading = ref<boolean>(true);

function handleHover(): void {
  iconDirection.value = iconDirections.left;
}

function handleLeave(): void {
  iconDirection.value = iconDirections.down;
  setTimeout(() => {
    isExpanded.value = false;
  }, 100);
}

async function fetchAvatars(): Promise<void> {
  try {
    const responses = await Promise.all([
      $fetch(apiBaseUrl),
      $fetch(apiBaseUrl),
      $fetch(apiBaseUrl),
    ]);

    avatarSrcs.value = await Promise.all(
      responses.map(async (blob) => await blobToBase64(blob as Blob))
    );

    if (avatarSrcs.value.length) loading.value = false;
  } catch (error) {
    console.error("[API] Failed to fetch avatars:", error);
  }
}

function expandSticker(): void {
  isExpanded.value = !isExpanded.value;
}

function giveAdvice(): void {
  navigateTo(consultServiceUrl, { external: true, open: "_blank" });
}

onMounted(async () => {
  await fetchAvatars();
});
</script>

<template>
  <div
    v-if="!loading"
    @mouseover="handleHover"
    @mouseleave="handleLeave"
    :class="[
      'sticker',
      isExpanded ? 'sticker--expanded' : 'sticker--collapsed',
    ]"
  >
    <p v-if="isExpanded" class="title">Консультация эксперта</p>
    <UAvatarGroup class="avatar-group" size="3xl">
      <UAvatar
        v-for="(url, index) in avatarSrcs"
        :key="index"
        :src="url"
        :alt="`Avatar #${index}`"
        loading="lazy"
      />
    </UAvatarGroup>
    <UButton
      v-if="isExpanded"
      color="neutral"
      variant="outline"
      size="xs"
      class="button"
      @click="giveAdvice"
    >
      Получить консультацию
    </UButton>
    <div class="sticker-icon" @click="expandSticker">
      <UIcon :name="iconDirection" class="size-5" />
    </div>
  </div>
</template>

<style lang="scss">
$sticker-color: #f4f6f9;

.sticker {
  background-color: $sticker-color;
  color: $text-color;
  min-height: 200px;
  border-top-left-radius: $border-radius-small;
  border-bottom-left-radius: $border-radius-small;
  top: 40%;
  right: 1%;
  position: fixed;

  &--collapsed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $basic-spacing-big 4px 0px 4px;

    .avatar-group {
      .bg-elevated {
        margin-top: $basic-spacing * -1;
        transition: margin 0.3s ease-in-out;
      }

      display: flex;
      flex-direction: column;
    }

    &:hover .bg-elevated {
      margin-top: 0;
    }

    &:hover {
      cursor: pointer;
    }

    .sticker-icon {
      padding: $basic-spacing;
      color: $icon-color;
      &:hover {
        cursor: pointer;
        color: $icon-color-hover;
      }
    }
  }

  &--expanded {
    padding: $basic-spacing-big;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar-group {
      display: flex;
      flex-direction: row;
    }

    .title {
      width: 70%;
      text-align: center;
      font-size: $font-size-medium;
      font-weight: 550;
      margin-bottom: $basic-spacing-big;
    }

    .sticker-icon {
      display: none;
    }

    .button {
      padding: $basic-spacing;
      &:hover {
        cursor: pointer;
      }
    }
  }

  // UI lib overrides
  .avatar-group {
    margin-bottom: $basic-spacing-big;

    .ring-bg {
      --tw-ring-color: $sticker-color;
    }

    .rounded-full {
      border-radius: $border-radius-small;
    }
  }
}
</style>
