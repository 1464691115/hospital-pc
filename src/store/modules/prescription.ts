import { defineStore } from 'pinia';
import { PresEntity } from '@/service/pres/model/presModel';
import { getConsultationOrderInfoApi, getConsultationOrderOptionsApi } from '@/service/consultation/order';
import { jsonStrToObject } from '@/utils';

interface PrescriptionState {
  /** 当前正在查看的问诊订单 */
  currentConId: string
  prescriptList: PresEntity[]
}

export const usePrescriptionStore = defineStore({
  id: 'app-prescription',
  state: (): PrescriptionState => ({
    currentConId: '',
    prescriptList: [] as PresEntity[]
  }),
  getters: {
  },
  actions: {
    async setCurrentConId(id: string) {
      this.currentConId = id.replace(/(GROUP|C2C)/, '')
      console.log(id);


      switch (/(GROUP|C2C)/.exec(id)?.[0]) {
        case 'GROUP':
          const res = await getConsultationOrderInfoApi({ id: this.currentConId })
          // res.medicine = jsonStrToObject(res.medicine)
          // res.pres_body = jsonStrToObject(res.pres_body)

          // this.prescriptList = res.Pres 

          console.log(res.Pres);


          break;
        case 'C2C':
          alert('C2C')

          break;

        default:
          break;
      }
    }
  },
});

