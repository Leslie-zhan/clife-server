<template>
  <div>
    <svg
      t="1677929198731"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4934"
      width="20"
      height="20"
    >
      <path
        d="M842 182H182c-66 0-120 54-120 120v420c0 66 54 120 120 120h660c66 0 120-54 120-120V302c0-66-54-120-120-120z m30 510c0 33-27 60-60 60H212c-33 0-60-27-60-60V332c0-33 27-60 60-60h600c33 0 60 27 60 60v360z"
        :fill="`${plcolor}`"
        p-id="4935"
      ></path>
      <path
        d="M302 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"
        :fill="`${plcolor}`"
        p-id="4936"
      ></path>
      <path
        d="M512 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"
        :fill="`${plcolor}`"
        p-id="4937"
      ></path>
      <path
        d="M722 512m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"
        :fill="`${plcolor}`"
        p-id="4938"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    plcolor: {
      default: '#1a1a1a',
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped></style>
