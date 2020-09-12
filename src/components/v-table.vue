<template>
  <div class="v-table" v-show="isLoaded">
    <div class="v-table-search">
      <v-search v-model="searchValue" @searchBtnClicked="handleInput" />
    </div>
    <div class="table">
      <div class="table-header">
        <v-header-cell
          v-for="item in config"
          :key="item.key"
          :keyName="item.key"
          :sortBy="sortBy"
          :sortIconStyle="sortIconStyle"
        >
          {{ item.label }}
        </v-header-cell>
      </div>
      <div
        v-for="dataItem in data"
        :key="dataItem.id"
        @click="showPopupInfo(dataItem)"
        class="table-content"
      >
        <div :key="item.key" class="table-content-item" v-for="item in config">
          {{ getObjectField(dataItem, item.key) }}
        </div>
      </div>
      <v-popup ref="popup" v-if="popupData">
        <div slot="header">{{ popupData ? popupData.fullname : "" }}</div>
        <v-popup-content slot="body" :data="popupData"></v-popup-content>
      </v-popup>
    </div>
    <div>
      <v-pagination
        :total="total"
        :searchMethod="searchUsers"
        :size="size"
        ref="pagination"
      />
    </div>
  </div>
</template>

<script>
import vPagination from "./v-pagination";
import vHeaderCell from "./v-header-cell";
import vSearch from "./v-search";
import vPopup from "./v-popup";
import vPopupContent from "./v-popup-content";

export default {
  name: "v-table",
  components: {
    vPagination,
    vSearch,
    vHeaderCell,
    vPopup,
    vPopupContent
  },
  props: {
    users: {
      type: Array,
      default: () => []
    },
    config: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number
    }
  },
  data() {
    return {
      searchValue: "",
      sortedBy: {
        column: "",
        order: false
      },
      popupData: null,
      data: [],
      total: 0
    };
  },
  watch: {
    users: function() {
      this.$refs.pagination.firstPage();
      this.total = this.users.length;
    }
  },
  computed: {
    isLoaded() {
      return this.users.length > 0;
    },
    filteredList() {
      return this.users.filter(user => {
        return (
          user.fullname
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          user.uname.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          user.company.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          user.address.state
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        );
      });
    }
  },
  methods: {
    searchUsers(pageNumber, pageSize) {
      const start = pageNumber * pageSize,
        end = start + pageSize;
      this.data = this.filteredList.slice(start, end);
    },
    handleInput() {
      if (this.searchValue === "") {
        this.total = this.users.length;
      } else {
        this.total = this.filteredList.length;
        this.data = this.filteredList.slice(0, 10);
      }
      this.$refs.pagination.firstPage();
    },
    showPopupInfo(dataItem) {
      this.popupData = dataItem;
      setTimeout(() => {
        this.$refs.popup.showPopup();
      });
    },
    getObjectField(obj, path) {
      const parts = path.split(".");
      let result = obj;
      parts.forEach(partEl => {
        result = result[partEl];
      });
      return result;
    },
    sortBy(keyName) {
      function getCompare(asc) {
        return function compare(d1, d2) {
          const correction = asc ? 1 : -1;
          let ascCompared = -1;
          if (
            this.getObjectField(d1, keyName).toLowerCase() >
            this.getObjectField(d2, keyName).toLowerCase()
          ) {
            ascCompared = 1;
          }
          return correction * ascCompared;
        };
      }

      let asc = true;
      if (this.sortedBy.column === keyName) {
        asc = !this.sortedBy.order;
      }
      this.sortedBy = {
        column: keyName,
        order: asc
      };
      this.users = this.users.sort(getCompare(this.sortedBy.order).bind(this));
    },
    sortIconStyle(columnName) {
      return {
        sorted: columnName === this.sortedBy.column,
        desc: !this.sortedBy.order
      };
    }
  },
  mounted() {
    this.$refs.pagination.firstPage();
  }
};
</script>

<style lang="scss" scoped>
.v-table {
  background-color: #ececec;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 black;
  max-width: 1200px;
  margin: 0 auto;

  &-search {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    padding: 10px;

    &__btn {
      margin-left: 10px;
    }
  }
}

.table {
  display: flex;
  flex-direction: column;
  padding: 10px;

  &-header,
  &-content {
    border-bottom: 1px solid #aeaeae;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &-item {
      display: flex;
      justify-content: center;
      min-width: 160px;
      height: 20px;
      padding-right: 10px;
    }
  }

  &-content {
    display: flex;

    &:hover {
      background-color: #70abff;
      cursor: pointer;
    }
  }
}
</style>
