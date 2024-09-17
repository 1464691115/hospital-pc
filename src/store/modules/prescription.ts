import { defineStore } from 'pinia';
import { getToken } from '@/utils/auth';
import { PresEntity } from '@/service/pres/model/presModel';
import { getPresInfoApi } from '@/service/pres/pres';

interface PrescriptionState {
  /** 当前正在查看的处方订单 */
  currentPreId: string
  prescriptInfo: PresEntity
}

export const usePrescriptionStore = defineStore({
  id: 'app-prescription',
  state: (): PrescriptionState => ({
    currentPreId: '',
    prescriptInfo: {}
  }),
  getters: {
  },
  actions: {
    async setCurrentPreId(id: string) {
      this.currentPreId = id.replace(/(GROUP|C2C)/, '')

      switch (/(GROUP|C2C)/.exec(id)?.[0]) {
        case 'GROUP':
          this.prescriptInfo = await getPresInfoApi({ id: this.currentPreId })

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

