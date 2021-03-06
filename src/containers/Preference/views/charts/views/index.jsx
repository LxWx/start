import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent, Charts } from 'components';
import { Row, Col, Checkbox } from 'antd';
import update from 'immutability-helper';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
// import {createTimer, clearTimer} from 'common';


// const initialArray = [1, 2, 3];
// const newArray = update(initialArray, {$set: [4]}); // => [1, 2, 3, 4]
// console.log(initialArray, 'initialArray');
// console.log(newArray, 'newArray');
const CheckboxGroup = Checkbox.Group;
const options = [
    {
        label: (<div className={styles.labelMain}>
            <div>
                昨天所有当站货等级的柱状图
            </div>
            <div>
                2018/12/23 8:35
            </div>
        </div>), value: '0'
    },
    {
        label: (<div className={styles.labelMain}>
            <div>
                昨天所有当站货等级的柱状图
            </div>
            <div>
                2018/12/23 8:35
            </div>
        </div>), value: '1'
    },
    {
        label: (<div className={styles.labelMain}>
            <div>
                昨天所有当站货等级的柱状图
            </div>
            <div>
                2018/12/23 8:35
            </div>
        </div>), value: '2'
    },
    {
        label: (<div className={styles.labelMain}>
            <div>
                昨天所有当站货等级的柱状图
            </div>
            <div>
                2018/12/23 8:35
            </div>
        </div>), value: '3'
    },

];
class PreferenceCharts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ]
        };
    }
    onChange(checkedValues) {
        let arr = checkedValues.reduce((previousValue, currentValue) => {
            previousValue.push(<Charts />);
            return previousValue;
        }, []);
        let {data} = this.state;
        let newData = update(data, {$set: arr});
        this.setState({
            data: newData
        });
    }
    render() {
        return (
            <div className={styles.main}>
                <Row gutter={20}>
                    <Col span={16}>
                        <div className={styles.title}>

                        </div>
                        <div className={styles.chartContent}>
                            {
                                this.state.data.map(it => {
                                    return it;
                                })
                            }
                        </div>

                    </Col>
                    <Col span={8}>

                        <div className={styles.ulMain}>
                            <div className={styles.title}>

                                我的图表
                            </div>
                            <div className={styles.ulChild}>
                                <CheckboxGroup options={options} onChange={this.onChange} />
                            </div>
                        </div>

                    </Col>
                </Row>

            </div>
        );
    }
}

PreferenceCharts.propTypes = {

};
PreferenceCharts.defaultProps = {

};

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(PreferenceCharts);