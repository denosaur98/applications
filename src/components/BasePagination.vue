<template>
  <div class="base-pagination">
    <div class="pagination__count-wrapper">
      <div class="pages__count-wrapper">
        <p class="pages__count">1 — 10 <span>из</span> {{ tasks.count }} <span>записей</span></p>
      </div>
      <div class="pages__select-wrapper">
        <input class="select__input" v-model="pageSize" @change="updatePageSize">
        <button class="select__button">
          <img src="../assets/icons/arrow-bottom.svg" class="arrow__icon">
        </button>
      </div>
    </div>
    <div class="pagination__items">
      <button class="pagination__button button__left" @click="goToFirstPage">
        <img src="../assets/icons/prew-to-first.svg">
      </button>
      <button class="pagination__button" @click="goToPreviousPage">
        <img src="../assets/icons/prew.svg">
      </button>
      <button 
        class="pagination__button"
        v-for="page in visiblePages"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }" 
        :key="page"
      >
        {{ page }}
      </button>
      <button class="pagination__button" @click="showNextPages" v-if="currentPageGroup * pagesPerGroup < tasks.pages">...</button>
      <button 
        class="pagination__button" 
        :class="{ active: currentPage === tasks.pages }" 
        @click="goToLastPage" 
        v-if="currentPage !== tasks.pages && !visiblePages.includes(tasks.pages)"
      >
        {{ tasks.pages }}
      </button>
      <button class="pagination__button" @click="goToNextPage">
        <img src="../assets/icons/next.svg">
      </button>
      <button class="pagination__button button__right" @click="goToLastPage">
        <img src="../assets/icons/last.svg">
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasePagination',
  data() {
    return {
      currentPageGroup: 1,
      pagesPerGroup: 5,
      pageSize: 10,
    }
  },

  computed: {
    ...mapState(['tasks', 'currentPage']),
    visiblePages() {
      const startPage = (this.currentPageGroup - 1) * this.pagesPerGroup + 1
      const endPage = Math.min(startPage + this.pagesPerGroup - 1, this.tasks.pages)
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }
  },

  methods: {
    ...mapActions(['fetchTasks']),
    async goToPage(page) {
      try {
        await this.fetchTasks({ page, pageSize: this.pageSize })
        this.$router.push({ query: { page } })
      } catch (err) {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      }
    },
    showNextPages() {
      if (this.currentPageGroup * this.pagesPerGroup < this.tasks.pages) {
        this.currentPageGroup++
        this.goToPage((this.currentPageGroup - 1) * this.pagesPerGroup + 1)
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        if (this.currentPage === this.visiblePages[0]) {
          this.currentPageGroup--
        }
        this.goToPage(this.currentPage - 1)
      }
    },
    goToNextPage() {
      if (this.currentPage < this.tasks.pages) {
        if (this.currentPage === this.visiblePages[this.visiblePages.length - 1]) {
          this.currentPageGroup++
        }
        this.goToPage(this.currentPage + 1)
      }
    },
    goToFirstPage() {
      this.currentPageGroup = 1
      this.goToPage(1)
    },
    goToLastPage() {
      this.currentPageGroup = Math.ceil(this.tasks.pages / this.pagesPerGroup)
      this.goToPage(this.tasks.pages)
    },
    updatePageSize() {
      this.fetchTasks({ page: this.currentPage, pageSize: this.pageSize })
    }
  },

  mounted() {
    this.fetchTasks({ page: this.currentPage, pageSize: this.pageSize })
  }
}
</script>

<style lang="scss" scoped>
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  margin-top: 35px;

  .pagination__count-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;


    .pages__count-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .pages__count {
        font-size: 14px;
        font-size: Roboto;
        font-weight: 700;

        span {
          font-weight: 400;
        }
      }
    }

    .pages__select-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgb(204, 204, 204);
      padding: 10px 0;

      .select__input {
        border: none;
        width: 57px;
        color: rgb(51, 51, 51);
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: left;
      }

      .select__button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        width: 24px;
        height: 24px;

        .arrow__icon {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .pagination__items {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 485px;
    gap: 10px;

    .pagination__button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 100%;
      background: none;
      border: none;
      color: rgb(108, 117, 125);
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 12px;
      letter-spacing: 0%;
      text-align: center;

      &.button__left {margin-right: 35px;}
      &.button__right {margin-left: 35px;}
      &.active {
        border-radius: 50%;
        box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
        background: rgb(80, 176, 83);
        color: #fff;
        min-width: 40px;
        min-height: 40px;
      }

      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>