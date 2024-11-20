<template>
  <div class="tasks-page">
    <h1 class="page__title">Список заявок</h1>
    <TasksList />
  </div>
</template>

<script>
import TasksList from "@/components/TasksList.vue";

export default {
  name: 'TasksPage',
  components: {
    TasksList
  }
}
</script>

<style lang="scss" scoped>
.tasks-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: rgb(238, 238, 238);
  padding: 32px;

  .page__title {
    color: rgb(69, 69, 69);
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: left;
    margin-bottom: 90px;
  }
}
</style>