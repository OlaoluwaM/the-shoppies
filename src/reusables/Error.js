import { m as motion } from 'framer-motion';
import { ReactComponent as ErrorSvg } from '../assets/error.svg';

export default function ErrorSVG(props) {
  return (
    <motion.div {...props}>
      <ErrorSvg />
    </motion.div>
  );
}
