<template>
  <div class="con_3">
    <div class="con_header">
      节点管理
    </div>
    <div class="con_search">
      <div>
        所属企业：
        <el-select v-model="enterprise_value" placeholder="请选择">
          <el-option
            v-for="item in enterprise"
            :key="item.value"
            :label="item.companyName"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="con_search_state">
        运行状态：
        <el-select v-model="state_value" placeholder="请选择">
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="Search()">检索</el-button>
    </div>
    <div class="con_header mar_top">
      节点详情
    </div>
    <div class="con_table">
      <el-table
        :data="tableData"
        border
        max-height="535"
        style="width: 100%"
        :header-cell-style="this.tableHeaderColor">
        <el-table-column
          prop="nodeName"
          label="节点名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属企业"
          align="center">
        </el-table-column>
        <el-table-column
          prop="hostName"
          label="挂载主机"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="运行状态"
          align="center">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="操作"-->
        <!--align="center"-->
        <!--width="90">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick_2(scope.row)" type="text" size="small">查看</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
  </div>

</template>

<script>
  import {getCompany, getNodeInfo} from '../../api/interface'

  export default {
    name: "index",
    data() {
      return {
        enterprise: [],
        state: [
          {
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '运行中'
          }, {
            value: 2,
            label: '未启动'
          }, {
            value: 3,
            label: '已停止'
          }
        ],
        enterprise_value: 0,
        state_value: 0,
        tableData: []
      }
    },
    methods: {
      /*获取公司*/
      getCompany() {
        let chains = this.$store.getters.chainIds
        let selectchains = this.$store.getters.select_chainId
        let data = {}
        data.userId = this.$store.getters.roles.userId
        data.chainId = chains[selectchains].chainId
        getCompany(data).then(response => {
          for (let a = 0; a < response.length; a++) {
            response[a].value=a
          }
          this.enterprise=response
          this.getNodeInfo()
        })
      },
      /*获取节点详情*/
      getNodeInfo() {
        let chains = this.$store.getters.chainIds;
        let selectchains = this.$store.getters.select_chainId;
        let companyName = this.enterprise[this.enterprise_value].companyName;
        let chainId = chains[selectchains].chainId;
        let runStatus = this.state[this.state_value].label;
        let companyId = this.enterprise[this.enterprise_value].companyId;
        getNodeInfo(companyName,chainId,runStatus,companyId).then(response => {
          this.tableData =response
        })
      }
      ,
      /*检索*/
      Search(){
        this.getNodeInfo()
      }
    },
    mounted() {
      this.getCompany()
    }
  }
</script>

<style scoped>
  .con_3 {
    width: 96%;
    padding: 2%;
  }

  .con_search {
    display: flex;
  }

  .con_header {
    font-size: 18px;
    padding-bottom: 30px;
    font-weight: 600;
  }

  .con_search_state {
    margin-left: 10%;
  }

  .el-button {
    margin-left: 10%;
    padding: 10px 30px;
  }

  .mar_top {
    margin-top: 50px;
  }
</style>
