import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function ItemAddList(props) {
  const classes = useStyles();
  const [sub_title, setSub_title] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [progress, setProgress] = React.useState("");
  const [memo, setMemo] = React.useState("");

  const onChangeSub_title = e => setSub_title(e.target.value);
  const onChangeDuration = e => setDuration(e.target.value);
  const onChangeProgress = e => setProgress(e.target.value);
  const onChangeMemo = e => setMemo(e.target.value);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          제목
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sub_title}
          onChange={onChangeSub_title}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>제목선택</em>
          </MenuItem>
          <MenuItem value={props.item}>{props.item}</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="제목"
          placeholder="제목신규입력"
          name="sub_title"
          value={sub_title}
          onChange={onChangeSub_title}
        />
        <br />
        <TextField
          id="standard-basic"
          label="투자시간"
          name="duration"
          value={duration}
          onChange={onChangeDuration}
        />
        <br />
        <TextField
          id="standard-basic"
          label="진도"
          name="progress"
          value={progress}
          onChange={onChangeProgress}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="#태그"
          name="memo"
          value={memo}
          onChange={onChangeMemo}
          variant="outlined"
        />
      </form>
    </div>
  );
}
