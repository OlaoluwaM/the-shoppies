import { m as motion } from 'framer-motion';
import { ReactComponent as MoonSvg } from '../assets/moon.svg';

export default function Moon(props) {
  return (
    <motion.div {...props}>
      <MoonSvg />
    </motion.div>
  );
}
