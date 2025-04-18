<template>
  <div class="w-full h-screen max-h-full sm:p-4 relative bg-[#F5F6F6] sm:bg-white flex flex-col">
    <tiny-tabs v-model="activeName" class="bg-color-bg-1">
      <tiny-tab-item title="待我处理" name="first"></tiny-tab-item>
      <tiny-tab-item title="我发起" name="second"></tiny-tab-item>
      <tiny-tab-item title="我已处理" name="third"></tiny-tab-item>
    </tiny-tabs>

    <div class="hidden sm:flex mt-4 justify-between">
      <tiny-button type="primary" @click="handleAdd()">新增</tiny-button>
      <div>
        <tiny-slider-button-group v-model="radios" type="icon" @change="sliderChange">
          <tiny-slider-button label="1">
            <div class="w-full h-full flex justify-center items-center">
              <tiny-icon-table-mode></tiny-icon-table-mode>
            </div>
          </tiny-slider-button>
          <tiny-slider-button label="2">
            <div class="w-full h-full flex justify-center items-center">
              <tiny-icon-card-mode></tiny-icon-card-mode>
            </div>
          </tiny-slider-button>
        </tiny-slider-button-group>
      </div>
    </div>

    <div class="mt-3 overflow-auto mb-16">
      <tiny-grid
        highlight-current-row
        :fetch-data="fetchData"
        seq-serial
        :pager="pagerConfig"
        auto-resize
        :view-type="viewType"
        mf-show="card"
        :card-config="cardConfig"
        show-overflow
        height="100%"
        @card-click="handleDetail"
        @cell-click="handleDetail"
      >
        <tiny-grid-column field="title" title="处理事项"></tiny-grid-column>
        <tiny-grid-column field="billNum" title="票据编号"></tiny-grid-column>
        <tiny-grid-column field="status" title="状态"></tiny-grid-column>
        <tiny-grid-column field="curNode" title="当前节点"></tiny-grid-column>
        <tiny-grid-column field="curApprover" title="当前审批人"></tiny-grid-column>
        <tiny-grid-column card-co field="applicant" title="当前节点"></tiny-grid-column>
        <tiny-grid-column field="date" title="申请日期"></tiny-grid-column>
      </tiny-grid>
    </div>
    <div class="absolute bottom-0 w-full sm:hidden">
      <div class="flex items-center justify-center p-2 bg-color-bg-1">
        <tiny-button banner type="primary" @click="handleAdd()">发起审批</tiny-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabItem, Grid, GridColumn, Pager, Button, Tag, SliderButton, SliderButtonGroup } from '@opentiny/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconCardMode, IconTableMode } from '@opentiny/vue-icon'

const TinyTabs = Tabs
const TinyTabItem = TabItem
const TinyGrid = Grid
const TinyGridColumn = GridColumn
const TinyButton = Button
const TinySliderButton = SliderButton
const TinySliderButtonGroup = SliderButtonGroup

const TinyIconCardMode = IconCardMode()
const TinyIconTableMode = IconTableMode()

const radios = ref('1')

const activeName = ref('first')

const viewType = ref('mf')

const pagerConfig = {
  component: Pager,
  attrs: {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [5, 10],
    total: 0,
    layout: 'total, prev, pager, next, jumper, sizes'
  }
}
const getData = ({ page }) => {
  let curPage = page.currentPage
  let { pageSize } = page
  let offset = (curPage - 1) * pageSize

  return new Promise((resolve) => {
    resolve({
      result: tableData.value.slice(offset, offset + pageSize),
      page: { total: tableData.value.length }
    })
  })
}

const fetchData = {
  api: getData
}

const cardConfig = {
  cardSize: 'medium',
  primaryField: 'title',
  contentFields: ['curNode', 'curApprover', 'date'],
  tagFields: [
    [
      'status',
      {
        render: ({ h, row, field, value, config, color }) =>
          h(
            Tag,
            {
              props: {
                size: 'mini',
                type: value === '已通过' ? 'success' : 'default',
                customClass: 'inline-block h-4.5 leading-4.5'
              }
            },
            value
          )
      }
    ]
  ]
}

const tableData = ref([
  {
    id: 1,
    title: '办公用品采购申请',
    billNum: 'CG-2024-0001',
    status: '已通过',
    curNode: '财务经理审批',
    curApprover: '王丽',
    applicant: '李明',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: '研发设备更新申请',
    billNum: 'SB-2024-0058',
    status: '待审批',
    curNode: '技术总监审批',
    curApprover: '张伟',
    applicant: '陈杰',
    date: '2024-03-14'
  },
  {
    id: 3,
    title: '员工团建活动经费申请',
    billNum: 'TB-2024-0023',
    status: '待审批',
    curNode: '人事总监审批',
    curApprover: '刘芳',
    applicant: '赵阳',
    date: '2024-03-13'
  },
  {
    id: 4,
    title: '服务器维护费用申请',
    billNum: 'FW-2024-0102',
    status: '已通过',
    curNode: '信息部经理审批',
    curApprover: '周强',
    applicant: '郑华',
    date: '2024-03-12'
  },
  {
    id: 5,
    title: '新员工电脑配置申请',
    billNum: 'IT-2024-0089',
    status: '待审批',
    curNode: '行政经理审批',
    curApprover: '孙婷',
    applicant: '吴超',
    date: '2024-03-11'
  },
  {
    id: 6,
    title: '年度软件授权续费申请',
    billNum: 'RJ-2024-0045',
    status: '待审批',
    curNode: '技术副总审批',
    curApprover: '黄磊',
    applicant: '徐亮',
    date: '2024-03-10'
  },
  {
    id: 7,
    title: '会议室装修改造申请',
    billNum: 'ZX-2024-0012',
    status: '已通过',
    curNode: '总经理审批',
    curApprover: '马云',
    applicant: '韩雪',
    date: '2024-03-09'
  },
  {
    id: 8,
    title: '市场推广物料采购',
    billNum: 'SC-2024-0078',
    status: '已通过',
    curNode: '市场总监审批',
    curApprover: '林峰',
    applicant: '谢娜',
    date: '2024-03-08'
  },
  {
    id: 9,
    title: '员工培训课程费用申请',
    billNum: 'PX-2024-0034',
    status: '已通过',
    curNode: '人力资源总监审批',
    curApprover: '朱莉',
    applicant: '冯雷',
    date: '2024-03-07'
  },
  {
    id: 10,
    title: '产品包装设计外包申请',
    billNum: 'SJ-2024-0067',
    status: '待审批',
    curNode: '产品经理审批',
    curApprover: '白洁',
    applicant: '唐明',
    date: '2024-03-06'
  },
  {
    id: 11,
    title: '研发实验室设备采购',
    billNum: 'YF-2024-0091',
    status: '已通过',
    curNode: '研发总监审批',
    curApprover: '高峰',
    applicant: '梁朝',
    date: '2024-03-05'
  },
  {
    id: 12,
    title: '办公楼网络升级申请',
    billNum: 'WL-2024-0056',
    status: '待审批',
    curNode: 'IT主管审批',
    curApprover: '彭华',
    applicant: '江涛',
    date: '2024-03-04'
  },
  {
    id: 13,
    title: '年度员工体检费用申请',
    billNum: 'TJ-2024-0023',
    status: '待审批',
    curNode: '人事经理审批',
    curApprover: '董静',
    applicant: '何勇',
    date: '2024-03-03'
  },
  {
    id: 14,
    title: '销售部门差旅费用申请',
    billNum: 'CL-2024-0145',
    status: '已通过',
    curNode: '销售总监审批',
    curApprover: '邓超',
    applicant: '范冰',
    date: '2024-03-02'
  },
  {
    id: 15,
    title: '新品发布会场地租赁',
    billNum: 'FB-2024-0034',
    status: '待审批',
    curNode: '市场经理审批',
    curApprover: '汪洋',
    applicant: '金星',
    date: '2024-03-01'
  },
  {
    id: 16,
    title: '质检设备年度校准费用',
    billNum: 'ZJ-2024-0078',
    status: '待审批',
    curNode: '质量总监审批',
    curApprover: '程勇',
    applicant: '叶青',
    date: '2024-02-29'
  },
  {
    id: 17,
    title: '仓库监控系统升级',
    billNum: 'CK-2024-0045',
    status: '已通过',
    curNode: '安防主管审批',
    curApprover: '田野',
    applicant: '石磊',
    date: '2024-02-28'
  },
  {
    id: 18,
    title: '员工宿舍维修申请',
    billNum: 'SS-2024-0012',
    status: '已通过',
    curNode: '后勤主管审批',
    curApprover: '关山',
    applicant: '龙飞',
    date: '2024-02-27'
  },
  {
    id: 19,
    title: '食堂设备更新申请',
    billNum: 'ST-2024-0089',
    status: '待审批',
    curNode: '行政主管审批',
    curApprover: '贾明',
    applicant: '魏青',
    date: '2024-02-26'
  },
  {
    id: 20,
    title: '消防设施年检费用',
    billNum: 'XF-2024-0067',
    status: '待审批',
    curNode: '安全主管审批',
    curApprover: '方刚',
    applicant: '任伟',
    date: '2024-02-25'
  }
])

const sliderChange = (val) => {
  if (val === '1') {
    viewType.value = 'mf'
  } else {
    viewType.value = 'card'
  }
}

const router = useRouter()

const handleAdd = () => {
  router.push({ path: '/about' })
}

const handleDetail = () => {
  router.push({ path: '/detail' })
}
</script>

<style scoped>
nav.w-full {
  width: fit-content;
}
</style>
