<template>
  <div class="base-pagination">
    <div class="pagination__count-wrapper">
      <div class="pages__count-wrapper">
        <p class="pages__count">1 — 10 <span>из</span> 1500 <span>записей</span></p>
      </div>
      <div class="pages__select-wrapper">
        <input class="select__input" value="10">
        <button class="select__button">
          <img src="../assets/icons/arrow-bottom.svg" class="arrow__icon">
        </button>
      </div>
    </div>
    <div class="pagination__items">
      <button class="pagination__button button__left">
        <img src="../assets/icons/prew-to-first.svg">
      </button>
      <button class="pagination__button">
        <img src="../assets/icons/prew.svg">
      </button>
      <button class="pagination__button active">1</button>
      <button class="pagination__button">2</button>
      <button class="pagination__button">3</button>
      <button class="pagination__button">4</button>
      <button class="pagination__button">5</button>
      <button class="pagination__button">...</button>
      <button class="pagination__button">12</button>
      <button class="pagination__button">
        <img src="../assets/icons/next.svg">
      </button>
      <button class="pagination__button button__right">
        <img src="../assets/icons/last.svg">
      </button>
    </div>
  </div>
</template>

<script>

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