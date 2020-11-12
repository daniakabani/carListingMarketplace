import styled from "styled-components";

const GlobalStyle = styled.div`{
  #main {
    display: block;
    position: relative;
    min-height: 100vh;
    .form-wrapper {
      position: absolute;
      max-width: 600px;
      width: 100%;
      left: 50%;
      top: 35%;
      padding: 20px;
      border-radius: 7px;
      transform: translateX(-50%);
      box-shadow: 0px 10px 50px -10px rgba(173,194,217,0.5);
      h1 {
        text-align: center;
        text-transform: capitalize;
        font-weight: bold;
        margin-bottom: 20px;
      }
      form {
        .select, .tags {
          margin-bottom: 20px;
        }
      }
    }
    .content {
      padding: 7vh 13vw;
      header {
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
          text-transform: capitalize;
        }
        a {
          background-color: #057bff;
          padding: 10px 20px;
          border-radius: 10px;
          transition: all ease 0.3s;
          color: white;
          &:hover {
            background-color: #8e44ad;
          }
        }
      }
      .filters {
        h3 {
          font-weight: bold;
          text-transform: capitalize;
         margin-bottom: 20px; 
        }
        input {
          max-width: 300px;
        }
      }
      .list-view {
        ul.api-data {
          list-style: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            width: 100%;
            max-width: 300px;
            min-height: 300px;
            background-color: #eee;
            border-radius: 7px;
            margin: 0 30px 30px 0;
            padding: 20px;
            box-shadow: 0px 10px 50px -10px rgba(173,194,217,0.5);
            transition: ease all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            &:hover {
              transform: translate(-10px, -10px);
            }
            h2, h3 {
              text-transform: capitalize;
            }
            .actions {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-top: 20px;
              > div {
                margin-right: 10px;
              }
            }
          }
        }
        ul.pagination {
          list-style: none;
          padding: 0;
          margin: 40px 0 0 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          li {
            a {
              padding: 10px 20px;
              background-color: #057bff;
              color: white;
              transition: ease all 0.3s;
              margin-right: 10px;
              border-radius: 10px;
              cursor: pointer;
            }
            &:hover, &.active {
              a {
                background-color: #8e44ad;
              }
            }
            &.disabled {
              a {
                background-color: #ccc;
                pointer-events: none;
              }
            }
          }
        }
      }
      .view-data {
        position: absolute;
        max-width: 600px;
        width: 100%;
        left: 50%;
        top: 35%;
        padding: 20px;
        border-radius: 7px;
        transform: translateX(-50%);
        box-shadow: 0px 10px 50px -10px rgba(173,194,217,0.5);
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            padding: 10px 0;
            span {
              font-weight: bold;
              min-width: 150px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}`;

export default GlobalStyle;