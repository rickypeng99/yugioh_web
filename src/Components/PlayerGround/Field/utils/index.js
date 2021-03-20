import { DST_DIRECT_ATTACK } from '../../utils/constant'
export const calculate_battle_style = (info) => {
    const {src_index, dst_index } = info;

    const res = {
        cardIndex: src_index,
        style: {
            transform: 'translateY(calc(-200% - 60px))'
        }
    }

    if (dst_index == DST_DIRECT_ATTACK) {
        // direct attack;
        // 2 41, calc(-300% - 60px)
        // 1 24, calc(-200% - 90px)
        if (src_index == 2) {
        } else if (src_index == 0 || src_index == 4) {
            const neg = src_index == 0 ? 1 : -1
            res.style.transform = `rotate(${neg * 41}deg) translateY(calc(-300% - 60px))`
        } else {
            // 1 and 3
            const neg = src_index == 1 ? 1 : -1
            res.style.transform = `rotate(${neg * 24}deg) translateY(calc(-200% - 90px))`
        }
    } else {
        // others attack
        // 0 0, calc(-100% - 50px)
        // 1 38, -300
        // 2 50, -420
        // 3 67, -600
        // 4 74, -760
        const new_dst_index = 4 - dst_index
        const neg = src_index > new_dst_index ? -1 : 1;
        const diff = Math.abs(src_index - new_dst_index)
        if (diff == 0) {
            res.style.transform = `translateY(calc(-100% - 50px))`
        } else if (diff == 1) {
            res.style.transform = `rotate(${neg * 38}deg) translateY(-300px)`
        } else if (diff == 2) {
            res.style.transform = `rotate(${neg * 50}deg) translateY(-420px)`
        } else if (diff == 3) {
            res.style.transform = `rotate(${neg * 67}deg) translateY(-600px)`
        } else if (diff == 4) {
            res.style.transform = `rotate(${neg * 74}deg) translateY(-760px)`
        }

    }
    return res
}
