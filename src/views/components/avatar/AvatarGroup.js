import AvatarGroup from '../../../@core/components/avatar-group';

const data = [
  {
    img: require('../../../../src/assets/images/portrait/small/avatar-s-5.jpg')
  },
  {
    img: require('../../../../src/assets/images/portrait/small/avatar-s-7.jpg')
  },
  {
    img: require('../../../../src/assets/images/portrait/small/avatar-s-10.jpg')
  },
  {
    img: require('../../../../src/assets/images/portrait/small/avatar-s-11.jpg')
  },
  {
    img: require('../../../../src/assets/images/portrait/small/avatar-s-20.jpg')
  }
];

const AvatarGroupComponent = () => {
  return <AvatarGroup data={data} />;
};

export default AvatarGroupComponent;
