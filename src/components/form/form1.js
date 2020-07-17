import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteItem(id) {
    
  }

  render() {
    return(
      <Box component="span">
        {this.props.topicNum.map(id =>{
          return(
            <span>
            <FormControl fullWidth>
            <InputLabel htmlFor={id}>填写标题</InputLabel>
            <Input
            id={id}
            />
            </FormControl>
            <Button variant="contained" color="primary" onClick={eee}>
            播出
            </Button>
            <Button variant="contained" color="primary" onClick={deleteItem(id)} >
            删除
            </Button>
            </span>
          )

        })}
        
      </Box>
    )
  }
}