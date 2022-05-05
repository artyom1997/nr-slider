import cn from './slide.module.scss';

export default function Slide({children}){
    return(
        <div className={cn.slide}>
            {children}
        </div>
    )
}