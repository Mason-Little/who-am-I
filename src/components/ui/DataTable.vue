<script setup lang="ts">
const { headers, rows, highlightColumn } = defineProps<{
  headers: string[]
  rows: string[][]
  highlightColumn?: number
}>()
</script>

<template>
  <div class="my-6 overflow-hidden rounded-xl border border-border">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="bg-gradient-to-r from-bg-secondary to-bg-tertiary">
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="px-4 py-3 text-left font-semibold text-text-primary first:rounded-tl-xl last:rounded-tr-xl"
            :class="{ 'text-accent': highlightColumn === i }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="border-t border-border transition-colors hover:bg-bg-secondary/50"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-4 py-3 text-text-secondary"
            :class="{ 'text-accent font-medium': highlightColumn === cellIndex }"
          >
            <span v-html="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
