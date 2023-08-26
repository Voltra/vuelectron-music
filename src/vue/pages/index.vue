<template>
	<div class="dispatcher" />
</template>

<script setup lang="ts">
	import { onMounted } from "vue";
	import { useRouter } from "vue-router/auto";

	const router = useRouter();

	const goPlayer = () => {
		router.push("/desktop-player");
	};

	const goDragAndDrop = () => {
		router.push("/drag-drop");
	};

	const hasPlaylists = false;

	onMounted(() => {
		if (hasPlaylists) {
			goPlayer();
		} else {
			goDragAndDrop();
		}
	});
</script>
