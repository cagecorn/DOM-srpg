// src/ai/nodes/Node.js

/**
 * 모든 노드 상태를 정의하는 열거형(Enum) 객체입니다.
 * @readonly
 */
export const NodeState = Object.freeze({
    SUCCESS: 'SUCCESS', // 행동 성공
    FAILURE: 'FAILURE', // 행동 실패
    RUNNING: 'RUNNING', // 행동 진행 중
});

/**
 * 행동 트리의 모든 노드의 기반이 되는 추상 클래스입니다.
 * 모든 노드는 이 클래스를 상속받아 evaluate 메서드를 구현해야 합니다.
 */
class Node {
    /**
     * 이 노드의 로직을 평가하고 실행합니다.
     * @param {object} unit - 이 트리를 실행하는 유닛
     * @param {Blackboard} blackboard - 해당 유닛의 블랙보드
     * @returns {NodeState} - 행동의 결과 상태
     */
    evaluate(unit, blackboard) {
        throw new Error("evaluate() 메서드는 반드시 자식 클래스에서 구현되어야 합니다.");
    }
}

export default Node;
