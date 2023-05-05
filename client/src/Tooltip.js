import styles from './tooltip.module.css'

export function Tooltip({interactionData}) {
    if(!interactionData) return null;

    return(
    <div
        className={styles.tooltip}
        style={{
            left: interactionData.xPos,
            top: interactionData.yPos
        }}
    >
        <div>{interactionData.title}</div>
        <div>{interactionData.artist}</div>
        <img src={interactionData.albumUrl} style={{height: '64px', width: '64px'}} />
    </div>)

}