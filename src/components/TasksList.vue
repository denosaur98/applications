<template>
  <div class="tasks-list">
    <button class="search__button" @click="openPopup">Создать</button>
    <div class="list__inputs-wrapper">
      <div class="search-wrapper">
        <input 
          class="input__search" 
          v-model="searchQuery" 
          placeholder="Поиск (№ заявки, название)"
        />
        <button class="search__btn" @click="onSearchClick">
          <img src="../assets/icons/search.svg">
        </button>
      </div>
      <div class="search-wrapper">
        <input 
          class="input__search" 
          v-model="addressSearchQuery" 
          placeholder="Адрес"
        />
        <button class="search__btn" @click="onAddressSearchClick">
          <img src="../assets/icons/search.svg">
        </button>
      </div>
    </div>
    <div class="list__table" style="height: 45px;">
      <div class="table__slot num-slot">
        <p class="table__item header-item">№</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot date-slot">
        <p class="table__item header-item">Создана</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot address-slot">
        <p class="table__item header-item">Адрес</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot user-slot">
        <p class="table__item header-item">Заявитель</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot description-slot">
        <p class="table__item header-item">Описание</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot time-slot">
        <p class="table__item header-item">Срок</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
      <div class="table__slot status-slot">
        <p class="table__item header-item">Статус</p>
        <img src="../assets/icons/arrow-up.svg">
      </div>
    </div>
    <div class="list__table" v-for="task in filteredTasks" :key="task.id">
      <div class="table__slot num-slot">
        <button class="table__change-btn" @click="openEditPopup(task)">{{ task.id.slice(0, 2) }}</button>
      </div>
      <div class="table__slot date-slot">
        <p class="table__item text-item" v-if="task.created_at">{{ formatDate(task.created_at) }}</p>
      </div>
      <div class="table__slot address-slot">
        <p class="table__item text-item" v-if="task.premise">{{ task.premise.address }}, кв. {{ task.premise.apartments_count }}</p>
      </div>
      <div class="table__slot user-slot">
        <p 
          class="table__item text-item"
          v-if="task.applicant.last_name && task.applicant.first_name && task.applicant.patronymic_name"
        >
          {{ task.applicant.last_name }}. 
          {{ task.applicant.first_name.slice(0, 1) }}. 
          {{ task.applicant.patronymic_name.slice(0, 1) }}
        </p>
      </div>
      <div class="table__slot description-slot">
        <p class="table__item text-item" v-if="task.description">{{ task.description }}</p>
      </div>
      <div class="table__slot time-slot">
        <p class="table__item text-item" v-if="task.due_date">{{ formatDateWithTime(task.due_date) }}</p>
      </div>
      <div class="table__slot status-slot">
        <p class="table__item text-item" v-if="task.status.name">{{ task.status.name }}</p>
      </div>
    </div>
    <BasePagination :tasks="tasks"/>
    <BasePopup/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatDate } from '../helpers/formatDate.js';
import { formatDateWithTime } from '../helpers/formatDateWithTime.js';
import BasePagination from './BasePagination.vue';
import BasePopup from './BasePopup.vue';

export default {
  name: 'TasksList',
  components: {
    BasePagination,
    BasePopup
  },
  data() {
    return {
      searchQuery: '',
      filteredQuery: '',
      addressSearchQuery: '',
      filteredAddressQuery: ''
    }
  },

  computed: {
    ...mapState(['tasks']),
    filteredTasks() {
      if (!this.filteredQuery && !this.filteredAddressQuery) return this.tasks.results

      const query = this.filteredQuery.toLowerCase()
      const addressQuery = this.filteredAddressQuery.toLowerCase()

      return this.tasks.results.filter(task => {
        const idMatch = task.id.toString().slice(0, 2).toLowerCase() === query.slice(0, 2)
        const descriptionMatch = task.description && task.description.toLowerCase().includes(query)
        const addressMatch = task.premise && task.premise.address.toLowerCase().includes(addressQuery)

        return (idMatch || descriptionMatch) && (!addressQuery || addressMatch)
      })
    }
  },

  methods: {
    ...mapActions(['fetchTasks', 'openPopup', 'closePopup', 'setEditingTask']),
    formatDate,
    formatDateWithTime,
    openEditPopup(task) {
      this.setEditingTask(task)
    },
    onSearchClick() {
      this.filteredQuery = this.searchQuery
      this.updateUrlSearch()
    },
    onAddressSearchClick() {
      this.filteredAddressQuery = this.addressSearchQuery
      this.updateUrlSearch()
    },
    updateUrlSearch() {
      const queryParams = new URLSearchParams()
      if (this.filteredQuery) {
        queryParams.set('search', this.filteredQuery)
      }
      if (this.filteredAddressQuery) {
        queryParams.set('premise_id=', this.filteredAddressQuery)
      }
      window.history.pushState(null, '', '?' + queryParams.toString())
    }
  },

  mounted() {
    this.fetchTasks()
  }
}
</script>

<style lang="scss" scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;

  .search__button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: rgb(80, 176, 83);
    width: 80px;
    height: 25px;
    color: rgb(255, 255, 255);
    font-family: Roboto;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0%;
    text-align: center;
    border: none;
    margin-left: auto;
  }

  .list__inputs-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 15px;
    margin: 40px 0;

    .search-wrapper {
      display: flex;
      align-items: center;
      width: 50%;
      height: 55px;
      border-bottom: 1px solid rgb(204, 204, 204);

      .input__search {
        width: 100%;
        height: 100%;
        color: #000;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: left;
        border: none;
        padding-right: 5px;
    
        &::placeholder {
          color: rgba(153, 153, 153, 1);
        }
      }

      .search__btn {
        cursor: pointer;
        background: none;
        border: none;
      }
    }
  }

  .list__table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid rgb(204, 204, 204);

    .table__item {
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: left;
    }

    .header-item {color: rgb(80, 176, 83);}
    .text-item {color: rgb(51, 51, 51); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;}

    .table__slot {
      display: flex;
      align-items: center;
      width: auto;
      height: 60px;
      gap: 10px;

      .table__change-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: rgb(80, 176, 83);
        width: 55px;
        height: 30px;
        border: none;
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: center;
      }
    }
    
    .num-slot {width: 100px;}
    .date-slot, .time-slot, .status-slot {width: 150px;}
    .address-slot, .user-slot {width: 200px;}
    .description-slot {width: 260px;}
  }
}
</style>