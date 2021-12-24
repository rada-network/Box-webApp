import BoxList from 'components/MysteryBoxes/List'
import { ProvideMysteryBoxes } from 'providers/MysteryBoxes'

export default function MysteryBoxes() {
  return (
    <ProvideMysteryBoxes>
      <BoxList />
    </ProvideMysteryBoxes>
  )
}
