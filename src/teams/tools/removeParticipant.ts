import { Participant } from 'src/participants/participants.entity';

export function removeParticipant(arr: Participant[], id: number) {
  const requiredIndex = arr.findIndex((el) => {
    return el.id === id;
  });
  if (requiredIndex === -1) {
    return arr;
  }
  arr.splice(requiredIndex, 1);
  return arr;
}
