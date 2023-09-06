<template>
	<div class="dispatcher" />
</template>

<script setup lang="ts">
	import { onMounted } from "vue";

	const router = useRouter();

	const goPlayer = () => {
		router.push({ name: "desktopPlayer" });
	};

	const goDragAndDrop = () => {
		router.push({ name: "dragDrop" });
	};

	onMounted(() => {
		goDragAndDrop();
	});
</script>
