import { m as motion } from 'framer-motion';
import { ReactComponent as TrophySvg } from '../assets/trophy.svg';

export default function TrophySVG(props) {
  return (
    <motion.div {...props}>
      <TrophySvg />
    </motion.div>
  );
}
