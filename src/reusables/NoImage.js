import { m as motion } from 'framer-motion';
import { ReactComponent as NoImageSvg } from '../assets/no-image.svg';

export default function NoImageSVG(props) {
  return (
    <motion.div {...props}>
      <NoImageSvg />
    </motion.div>
  );
}
