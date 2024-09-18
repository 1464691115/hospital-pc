import { defineStore } from 'pinia';
import { getToken } from '@/utils/auth';
import { PresEntity } from '@/service/pres/model/presModel';
import { getPresInfoApi } from '@/service/pres/pres';
import { isDevMode } from '@/utils/env';
import { isString } from 'lodash-es';
import { jsonStrToObject } from '@/utils';
import { getConsultationOrderOptionsApi } from '@/service/consultation/order';

interface PrescriptionState {
  /** 当前正在查看的处方订单 */
  currentPreId: string
  prescriptInfo: PresEntity[]
}

export const usePrescriptionStore = defineStore({
  id: 'app-prescription',
  state: (): PrescriptionState => ({
    currentPreId: isDevMode() ? 'ed85d4bd-86c8-419c-99b9-89f9cde3b4ca' : '',
    prescriptInfo: []
  }),
  getters: {
  },
  actions: {
    async setCurrentPreId(id: string) {
      this.currentPreId = id.replace(/(GROUP|C2C)/, '')

      switch (/(GROUP|C2C)/.exec(id)?.[0]) {
        case 'GROUP':
          const res = await getConsultationOrderOptionsApi({ id: this.currentPreId })
          res.medicine = jsonStrToObject(res.medicine)
          res.pres_body = jsonStrToObject(res.pres_body)

          this.prescriptInfo = res

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

