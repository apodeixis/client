<template>
    <div class="p-8 bg-gray-900 text-2xl rounded-3xl">
        <div class="text-center mb-8 font-bold">
            {{ title }}
        </div>
        <div class="flex justify-center">
            {{ body }}
        </div>
        <div class="mt-5 mx-auto flex justify-center">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: ['title', 'body']
}

</script>