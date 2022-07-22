import img1 from '../../../../assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '../../../../assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '../../../../assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '../../../../assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '../../../../assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '../../../../assets/images/portrait/small/avatar-s-11.jpg';

export const assigneeOptions = [
  { value: 'Pheobe Buffay', label: 'Pheobe Buffay', img: img1 },
  { value: 'Chandler Bing', label: 'Chandler Bing', img: img2 },
  { value: 'Ross Geller', label: 'Ross Geller', img: img3 },
  { value: 'Monica Geller', label: 'Monica Geller', img: img4 },
  { value: 'Joey Tribbiani', label: 'Joey Tribbiani', img: img5 },
  { value: 'Rachel Green', label: 'Rachel Green', img: img6 },
  { value: 'Jerry Seinfeld', label: 'Jerry Seinfeld', img: img3 },
  { value: 'Jerry Seinfeld', label: 'Jerry Seinfeld', img: img3 },
  { value: 'Astro Kramer', label: 'Astro Kramer', img: img2 },
  { value: 'George Costanza', label: 'George Costanza', img: img5 },
  { value: 'Charlie Kelly', label: 'Charlie Kelly', img: img4 },
  { value: 'Dennis Reynolds', label: 'Dennis Reynolds', img: img3 },
];

export type AssigneeOptions = typeof assigneeOptions[number];