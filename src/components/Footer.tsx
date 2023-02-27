import classes from './Footer.module.scss'
import gacmen from './../assets/gacmen.png'
const Footer = () => {
	return (
		<footer>
			<div className={classes['footer__author']}>
				<p className={classes['footer__author-text']}>
					created by{' '}
					<a href='https://github.com/gacmen45'>
						<img src={gacmen} alt='' />
						gacmen45
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer
