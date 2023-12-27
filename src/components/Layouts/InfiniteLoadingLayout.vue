<template>
    <div class="m-auto center">
        <div class="text-4xl text-gray-300">{{ label }}</div>
        <div class="mx-auto flex justify-center my-3">
            <font-awesome-icon icon="cog" size="5x" :class="'text-gray-500'" class="text-center p-1 fa-spin" style="" />
        </div>
    </div>
</template>

<script>

export default {
    props: ['label']
}

</script>

