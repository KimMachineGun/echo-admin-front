<template>
  <div id="admin-page-wrapper">
    <div id="table-wrapper">
      <div id="table-button-wrapper">
        <div class="table-button" v-for="(table, index) in spec" :key="table.tableName" @click="() => {selected = index; getRows(table.structName)}">{{ table.tableName }}</div>
      </div>
      <table id="table-table" cellspacing="0">
        <thead>
          <tr>
            <td v-for="column in spec[selected].tableFields" :key="column.fieldName">{{ column.fieldName }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="field in row" :key="field">
              {{ field }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

/* TODO:
    1. 추가
    2. 삭제
    3. 필터링
    4. 수정
*/
<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      spec: {},
      selected: 0,
      rows: {}
    }
  },
  mounted () {
    this.$http.get(this.path.specPath)
    .then((res) => {
      this.spec = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  props: {
    path: {
      type: Object,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  methods: {
    getRows (schema, where, order) {
      console.log(arguments)
      this.$http.get(this.path.apiPath, {
        headers: {
          'Authorization': this.code
        },
        params: {
          schema: schema,
          where: where,
          order: order
        }
      })
      .then((res) => {
        let rows = res.data

        let columns = this.spec[this.selected].tableFields.map((column) => column.fieldName)

        rows = rows.map((row) => {
          let arr = []
          for (let col of columns) {
            arr.push(row[col])
          }

          return arr
        })

        this.rows = rows
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#admin-page-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #BBDEFB;
}

#table-wrapper {
  width: 700px;
  height: 600px;
  background-color: white;
  border-radius: 15px;
  overflow: auto;
}

#table-button-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 15px 15px 0 0;
  background-color: #2196F3;
}

.table-button {
  height: 40px;
  background-color: white;
  border-radius: 15px;
  padding : 0 10px 0 10px;
  line-height: 40px;
  font-size: 20px;
  margin: 0 7px 0 7px;
  font-weight: bold;
  cursor: pointer;
}

#table-table {
  width: 100%;

  thead > tr > td {
    background-color: rgb(207, 232, 252);
    height: 30px;
    font-weight: bold;
    text-indent: 5px;
  }

  tbody > tr > td {
    height: 30px;
    text-indent: 5px;
  }

  tbody > tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
}
</style>

